// نموذج تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  // تحقق بسيط من البيانات (يمكن تحسينه لاحقاً)
  if (username === 'admin' && password === '1234') {
    // تسجيل الدخول ناجح - الانتقال للصفحة الرئيسية
    window.location.href = 'home.html';
  } else {
    // عرض رسالة خطأ
    errorMessage.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
    errorMessage.classList.add('show');
  }
});
