from flask import Blueprint, jsonify
from app.models.models import Product

prod = Blueprint('prod', __name__)

@prod.route('/get_products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [{'name': product.product_name, 'price': product.price, 'quantity': product.quantity_available, 'product_id': product.product_id} for product in products]
    return jsonify(products_list)

def get_product_by_id(product_id):
    product = Product.query.filter_by(product_id=product_id).first()
    return product

@prod.route('/get_product_info/<int:product_id>', methods=['GET'])
def get_product_info(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify({
            'name': product.product_name,
            'price': product.price
        })
    else:
        return jsonify({'error': 'Product not found'}), 404