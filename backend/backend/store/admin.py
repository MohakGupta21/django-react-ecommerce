from django.contrib import admin
from store.models import Product,Category,Gallery,Specification,Size,Color, Cart, CartOrder, CartOrderItem
# Register your models here.

class GalleryInline(admin.TabularInline):
    model = Gallery
    extra = 0

class SizeInline(admin.TabularInline):
    model = Size
    extra = 0


class ColorInline(admin.TabularInline):
    model = Color
    extra = 0


class SpecificationInline(admin.TabularInline):
    model = Specification
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    list_display = ['title','price','shipping_amount','stock_qty','in_stock','vendor','featured']
    list_editable = ['featured']
    list_filter = ['date']
    search_fields = ['title']
    inlines = [GalleryInline,SizeInline,ColorInline,SpecificationInline]

# class CartAdmin(admin.ModelAdmin):
#     list_display = ['product','user','qty','price','total','country','cart_id']
#     list_editable = ['qty']
#     list_filter = ['date']
#     search_fields = ['product']
#     inlines = [GalleryInline,SizeInline,ColorInline,SpecificationInline]

# class CartOrderAdmin(admin.ModelAdmin):
#     list_display = ['oid','sub_total','shipping_amount','total','payment_status','order_status']
#     list_filter = ['date']
#     search_fields = ['vendor','buyer']
#     inlines = [GalleryInline,SizeInline,ColorInline,SpecificationInline]

# class CartOrderItemAdmin(admin.ModelAdmin):
#     list_display = ['order','product','vendor','price','qty','initial_total','saved','oid']
#     list_editable = ['qty']
#     list_filter = ['date']
#     search_fields = ['title']
#     inlines = [GalleryInline,SizeInline,ColorInline,SpecificationInline]

admin.site.register(Product,ProductAdmin)
admin.site.register(Cart)
admin.site.register(CartOrder)
admin.site.register(CartOrderItem)

admin.site.register(Category)
