import scrapy
from scrapy_splash import SplashRequest
from hm_scrapper.items import ProductItem
from hm_scrapper.itemloaders import ProductLoader
from itemloaders.processors import MapCompose
import logging

logger = logging.getLogger(__name__)


class InfiniteSpider(scrapy.Spider):
    name = 'infinite'
    allowed_domains = ['hm.com']
    start_urls = [
        'https://www2.hm.com/pl_pl/on/nowosci/view-all.html?offset=0&page-size=250']

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url, self.parse, args={
                'wait': 5,
            })

    def parse(self, response):
        item_selectors = response.xpath(
            '//*[@class="image-container"]//a/@href')
        for url in item_selectors.extract():
            yield SplashRequest(response.urljoin(url), self.parse_item, args={
                'wait': 0.3,
            })

    def parse_item(self, response):
        l = ProductLoader(item=ProductItem(), response=response)
        l.add_xpath(
            'name', '//*[@class="primary product-item-headline"]/text()', MapCompose(lambda n: n.strip()))
        l.add_xpath(
            'price_pln', '//*[@class="ProductPrice-module--productItemPrice__2i2Hc"]/span/text()', MapCompose(lambda p: p.replace(',', '.'), float), re=r'(.*)\sPLN')
        l.add_xpath(
            'color', '//*[@class="product-input-label"]/text()', MapCompose(lambda n: n.strip()))
        l.add_xpath(
            'image_urls', '//*[contains(@class, "pdp-image")]//img/@src', MapCompose(lambda i: response.urljoin(i)))
        l.add_xpath(
            'product_number', '//*[dt/text() = "Nr prod."]//dd/text()')
        l.add_xpath(
            'description', '//*[@class="pdp-description-text"]/text()')
        return l.load_item()
