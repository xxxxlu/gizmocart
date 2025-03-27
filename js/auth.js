document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginSwitch = document.getElementById('loginSwitch');
    const registerSwitch = document.getElementById('registerSwitch');

    // 表单切换逻辑
    loginSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginSwitch.classList.add('active');
        registerSwitch.classList.remove('active');
    });

    registerSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        registerSwitch.classList.add('active');
        loginSwitch.classList.remove('active');
    });

    // 注册逻辑
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inviteCode = document.getElementById('inviteCode').value;
        if (inviteCode !== 'GIZMO2024') {
            alert('邀请码错误，请检查后重试');
            return;
        }

        const userData = {
            email: document.getElementById('regEmail').value,
            password: document.getElementById('regPassword').value
        };

        localStorage.setItem(userData.email, JSON.stringify(userData));
        alert('注册成功，请登录');
        registerForm.reset();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginSwitch.classList.add('active');
        registerSwitch.classList.remove('active');
    });

    // 登录逻辑
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            alert('登录成功');
            window.location.href = 'index.html';
        } else {
            alert('邮箱或密码错误');
        }
    });
});