from django.db import models
from userauths.models import User
from vendor.models import Vendor
from shortuuid.django_fields import ShortUUIDField
from django.utils.text import slugify

# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to='category', default='category.jpg', null=True, blank=True)
    active = models.BooleanField(default=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Category"
        ordering = ['title']

class Product(models.Model):
    STATUS = (
        ("draft","Draft"),
        ("disabled","Disabled"),
        ("in_review","In Review"),
        ("published","Published")

    )
    title = models.CharField(max_length=100)
    image = models.FileField(upload_to='products', default='product.jpg', null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    old_price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    shipping_amount = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)
    stock_qty = models.PositiveIntegerField(default=1)
    in_stock = models.BooleanField(default=True)
    status = models.CharField(max_length=100, choices=STATUS, default="published")
    featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    pid = ShortUUIDField(unique=True, length=10, alphabet="abcdefg12345")
    slug = models.SlugField(unique=True)
    date = models.DateTimeField(auto_now_add=True)


    def save(self,*args,**kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.name)
        
        super(Product,self).save(*args,**kwargs)

    def __str__(self):
        return self.title


class Cart(models.Model):
    product =models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    sub_total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    shipping_amount = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    service_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    tax_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    country = models.CharField(max_length=100, null=True, blank=True)
    size = models.CharField(max_length=100,null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)
    cart_id = models.CharField(max_length=1000, null= True, blank= True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.cart_id} - {self.product.title}"
    
class CartOrder(models.Model):
    PAYMENT_STATUS = (
        ("paid","Paid"),
        ("pending","Pending"),
        ("processing","Processing"),
        ("cancelled","Cancelled")
    )

    ORDER_STATUS = (
        ("pending","Pending"),
        ("fulfilled","Fulfilled"),
        ("cancelled","Cancelled")
    )

    vendor = models.ManyToManyField(Vendor, blank=True)
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null= True, blank=True)

    sub_total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    shipping_amount = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    service_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    tax_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)

    payment_status = models.CharField(choices=PAYMENT_STATUS, max_length=100, default="pending")
    order_status = models.CharField(choices=ORDER_STATUS, max_length=100, default="pending")

    #Coupons
    initial_total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    saved = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)

    #Bio data
    full_name = models.CharField(null=True, blank=True, max_length=100)
    email = models.CharField(null=True, blank=True, max_length=100)
    mobile = models.CharField(null=True, blank=True, max_length=100)

    #Shipping Address
    address = models.CharField(null=True, blank=True, max_length=100)
    city = models.CharField(null=True, blank=True, max_length=100)
    state = models.CharField(null=True, blank=True, max_length=100)
    country = models.CharField(null=True, blank=True, max_length=100)

    oid = ShortUUIDField(unique=True, length=10, alphabet="abcdefg12345")
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.oid


class CartOrderItem(models.Model):
    order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)

    qty = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    sub_total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    shipping_amount = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    service_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    tax_fee = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    country = models.CharField(max_length=100, null=True, blank=True)
    
    size = models.CharField(max_length=100,null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)

    #Coupons
    initial_total = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)
    saved = models.DecimalField(default=0.00, max_digits=12, decimal_places=2)

    oid = ShortUUIDField(unique=True, length=10, alphabet="abcdefg12345")
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.oid

class Gallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    cart_order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    cart_order_item = models.ForeignKey(CartOrderItem, on_delete=models.CASCADE)

    image = models.FileField(upload_to='products', default='product.jpg')
    active = models.BooleanField(default=True)
    gid = ShortUUIDField(unique=True, length = 10, alphabet="abcdefg12345")

    def __str__(self):
        return self.product.title
    
    class Meta:
        verbose_name_plural = "Product Images"

class Specification(models.Model):
    product =models.ForeignKey(Product, on_delete=models.CASCADE)
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    # cart_order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    # cart_order_item = models.ForeignKey(CartOrderItem, on_delete=models.CASCADE)
    
    title = models.CharField(max_length=1000)
    content = models.CharField(max_length=1000)
    
    def __str__(self):
        return self.title

class Size(models.Model):
    product =models.ForeignKey(Product, on_delete=models.CASCADE)
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    # cart_order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    # cart_order_item = models.ForeignKey(CartOrderItem, on_delete=models.CASCADE)

    name = models.CharField(max_length=1000)
    price = models.DecimalField(decimal_places=2, max_digits=12, default=0.00)

    def __str__(self):
        return self.name
    
class Color(models.Model):
    product =models.ForeignKey(Product, on_delete=models.CASCADE)
    # cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    # cart_order = models.ForeignKey(CartOrder, on_delete=models.CASCADE)
    # cart_order_item = models.ForeignKey(CartOrderItem, on_delete=models.CASCADE)

    name = models.CharField(max_length=1000)
    color_code = models.CharField(max_length=1000)

    def __str__(self):
        return self.name
