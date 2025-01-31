from django.urls import path
from userauths import views as userauths_view
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("user/token/",userauths_view.MyTokenObtainPairView.as_view()),
    path("user/token/refresh/",TokenRefreshView.as_view()),

    path("user/register/",userauths_view.RegisterView.as_view()),
    path("user/password-reset/<email>/",userauths_view.PasswordResetEmailVerify.as_view(),name="password_reset"),
    path("user/password-change/",userauths_view.PasswordChangeView.as_view(),name="password_change")


]