export function isAuthenticated(key) {
  return _getCookie(key);
}

export function authenticateSuccess(loginUser) {
  _setCookie(loginUser);
}

export function logout() {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
  }
}

function _getCookie(name) {
  let start, end;
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + "=");
    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(";", start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
}

function _setCookie(loginUser, expire) {
  let date = new Date();
  console.log(loginUser);
  date.setDate(date.getDate() + expire);
  document.cookie = "uuid=" + loginUser.uuid;
  document.cookie = "adminName=" + loginUser.adminName;
  document.cookie = "password=" + loginUser.password;
  document.cookie = "realName=" + loginUser.realName;
  document.cookie = "sex=" + loginUser.sex;
  document.cookie = "telephone=" + loginUser.telephone;
  document.cookie = "email=" + loginUser.email;
  document.cookie = "role=" + loginUser.role;
  document.cookie = "roleName=" + loginUser.roleName;
  document.cookie = "path=/" + (expire ? ";expires=" + date.toGMTString() : "");
  console.log(document.cookie);
}
