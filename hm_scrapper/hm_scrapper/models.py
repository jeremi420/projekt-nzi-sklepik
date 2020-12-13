from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey
from sqlalchemy import (Integer, String, Text, Numeric)
from sqlalchemy.engine import create_engine
from sqlalchemy.orm import backref, relationship
from scrapy.utils.project import get_project_settings

Base = declarative_base()


def db_connect():
    return create_engine(get_project_settings().get('CONNECTION_STRING'))


def create_tables(engine):
    Base.metadata.create_all(engine)


class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True)
    name = Column('name', String(50))
    product_number = Column('product_number', String(25))
    color = Column('color', String(30))
    standard_cost = Column('product_cost', Numeric)
    description = Column('description', Text())
    images = relationship('Image', backref='product')


class Image(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey('products.id'))
    checksum = Column('checksum', String(32))
    path = Column('path', String(60))
    status = Column('status', String(20))
