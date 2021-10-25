// 새로운 플랫폼 추가 시
// 1. url에 따른 플랫폼 명, platform 인스턴스 설정
// 2. 플랫폼 symbol 추가 (path: images/[플랫폼명]-symbol)

// 기존에 파싱하는 코드에 영향 x (code's client)

export default class Platform {
  constructor(url) {
    if (url.startsWith('https://programmers.co.kr')) {
      this.name = 'programmers';
      this.platform = new Programmers();
    } else if (url.startsWith('https://www.acmicpc.net')) {
      this.name = 'baekjoon';
      this.platform = new Baekjoon();
    } else if (url.startsWith('https://level.goorm.io/')) {
      this.name = 'goorm';
      this.platform = new Goorm();
    } else throw new Error('unvalid url error'); // 처리 불가능한 url
    this.platform.setUrl(url);
  }
  getName() {
    return this.name;
  }
  getUrl() {
    return this.platform.getUrl();
  }
  setProblemTitle(doc) {
    this.platform.setProblemTitle(doc);
  }
  getProblemTitle() {
    return this.platform.problemTitle;
  }
}

class Baekjoon {
  setUrl(url) {
    this.url = url.replace('https://www.acmicpc.net', `/baekjoon`);
  }
  getUrl() {
    return this.url;
  }
  setProblemTitle(doc) {
    this.problemTitle = doc.querySelector('#problem_title').innerHTML.trim();
  }
}

class Programmers {
  setUrl(url) {
    this.url = url;
  }
  getUrl() {
    return this.url;
  }
  setProblemTitle(doc) {
    this.problemTitle = doc.querySelector('.algorithm-title').innerHTML.trim();
  }
}

class Goorm {
  setUrl(url) {
    this.url = url.replace('https://level.goorm.io', `/goorm`);
  }
  getUrl() {
    return this.url;
  }
  setProblemTitle(doc) {
    this.problemTitle = doc.getElementsByTagName('title')[0].innerHTML.split(' - ')[0];
  }
}
