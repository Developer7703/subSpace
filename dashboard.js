window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = 'index.html';
    }
    updateBalance(user.balance);
  });
  
  function updateBalance(balance) {
    document.getElementById('balance').innerText = `Balance: $${balance}`;
  }
  
  function deposit() {
    const amount = parseInt(prompt('Enter amount to deposit:'), 10);
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid amount');
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    user.balance += amount;
    localStorage.setItem('user', JSON.stringify(user));
    updateBalance(user.balance);
  }
  
  function withdraw() {
    const amount = parseInt(prompt('Enter amount to withdraw:'), 10);
    const user = JSON.parse(localStorage.getItem('user'));
    if (isNaN(amount) || amount <= 0 || amount > user.balance) {
      alert('Invalid amount or insufficient balance');
      return;
    }
    user.balance -= amount;
    localStorage.setItem('user', JSON.stringify(user));
    updateBalance(user.balance);
  }
  