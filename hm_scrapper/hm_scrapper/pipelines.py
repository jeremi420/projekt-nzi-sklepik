# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from sqlalchemy.orm import sessionmaker
from hm_scrapper.models import db_connect, create_tables, Product, Image
import logging

logger = logging.getLogger(__name__)


class ProductSavePipeline:
    def __init__(self):
        engine = db_connect()
        create_tables(engine)
        self.session = sessionmaker(engine)

    def process_item(self, item, spider):
        logger.info(item)
        session = self.session()
        product = Product()
        product.name = item['name']
        product.product_number = item['product_number']
        product.color = item['color']
        product.standard_cost = item['price_pln']
        product.description = item['description']
        if 'images' in item:
            for i in item['images']:
                image = Image()
                image.checksum = i['checksum']
                image.path = i['path']
                image.status = i['status']
                product.images.append(image)
        try:
            session.add(product)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
        return item
