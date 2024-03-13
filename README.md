# ALOG

에이로그 또는 알로그라 읽으며, **Algorithm log** 즉 알고리즘을 기록한다라는 의미입니다.

2021년 9월부터 2022년 1월까지 약 4개월간, 기획부터 배포까지 개인으로 진행한 프로젝트입니다. 다양한 코드 채점 플랫폼에서 제공하는 문제의 풀이를 기록하고, 원하는 문제의 풀이를 찾도록하는 웹 서비스를 제공합니다.

현재 기능 추가는 멈춘 상태이지만 유지보수를 위한 버그, 성능 개선 작업을 진행하고있습니다.

**[서비스 바로가기](https://alog.netlify.app)**

<br/>

## 목차

- ### [💬 계기](https://github.com/Hyeondoonge/Alog/#-계기-1)

- ### [⛳️ 시작 방법](https://github.com/Hyeondoonge/Alog/#%EF%B8%8F-시작-방법-1)

- ### [🛠️ 기술 스택](https://github.com/Hyeondoonge/Alog/#%EF%B8%8F-기술-스택-1)

- ### [✨ 구현 기능](https://github.com/Hyeondoonge/Alog/#-구현-기능-1)

  - **[홈 / 풀이 검색](https://github.com/Hyeondoonge/Alog/#1-%ED%99%88--%ED%92%80%EC%9D%B4-%EA%B2%80%EC%83%89)**
  - **[풀이 작성 및 수정](https://github.com/Hyeondoonge/Alog/#2-%ED%92%80%EC%9D%B4-%EC%9E%91%EC%84%B1-%EB%B0%8F-%EC%88%98%EC%A0%95)**
  - **[풀이 조회](https://github.com/Hyeondoonge/Alog/#3-%ED%92%80%EC%9D%B4-%EC%A1%B0%ED%9A%8C)**
  - **[마이 페이지](https://github.com/Hyeondoonge/Alog/#4-%EB%A7%88%EC%9D%B4-%ED%8E%98%EC%9D%B4%EC%A7%80)**
  - **[가입 및 인증](https://github.com/Hyeondoonge/Alog/#5-%EA%B0%80%EC%9E%85-%EB%B0%8F-%EC%9D%B8%EC%A6%9D)**

- ### [📄 버그 및 성능 개선 기록](https://github.com/Hyeondoonge/Alog/#-버그-및-성능-개선-기록-1)

<br/>

## 💬 계기

개인 블로그에 풀이를 작성하면서 알고리즘 글과 다른 유형의 기술 글들과 섞이는 것에 대해 불편함이 있었습니다. 블로그를 통해 자신이 어떤 것에대해 관심있어하는지를 보여주기 어렵다는 생각에서 출발하여, 문제 풀이만을 작성할 수 있는 서비스가 있으면 좋을 것 같다고 생각했습니다.

이후 개인 공부 그리고 코딩 테스트 준비 목적에서 학습을 하면서, 본인 만의 알고리즘을 개인 블로그에 기록하는 사람들이 많다는 것을 깨달았습니다.

이와 같은 사람들을 타겟으로하여 알고리즘 풀이만을 작성할 수 있는 플랫폼의 역할을 하면서도, Programmers와 Baekjoon과 같은 온라인 채점 플랫폼에 등록된 문제의 알고리즘 풀이들을 한 눈에 볼 수 있는 플랫폼이 있으면 사람들이 더 나은 환경에서 학습할 수 있을 것이라는 기대가 있었습니다.

따라서 **알고리즘 풀이를 찾는 사람**들 그리고 **작성하는 사람**들 모두에게 더 나은 편의성을 제공하고자하는 목표를 갖고 시작하게 됐습니다.

<br/>

## ⛳️ 시작 방법

### Clone

```
$ https://github.com/Hyeondoonge/Alog.git
```

### 환경 설정

- .env 파일을 **client 프로젝트** 최상단에 생성 후, 아래 코드를 입력해주세요

```
REACT_APP_ENV={development | production}
```

- .env 파일을 **server 프로젝트** 최상단에 생성 후, 아래 코드를 입력해주세요

```
PORT={app port}
MONGO_URI={mongodb server url}
USER_ID={mongodb user id}
USER_PASSWORD={mongodb user password}
ACCESS_SECRET_KEY={secret key for access token}
REFRESH_SECRET_KEY={secret key for refresh token}
KAKAO_API_CLIENT_KEY={kakao api client key}
KAKAO_API_REDIRECT_URI_DM={kakao login redirect url for development}
KAKAO_API_REDIRECT_URI_PM={kakao login redirect url for production}
```

### Install & Start

- 클라이언트 실행

```
$ cd client
$ npm install && npm start
```

- API 서버 실행

```
$ cd server
$ npm install && npm install pm2 -g
$ pm2 start ecosystem.config.js
```

<br/>

## 🛠️ 기술 스택

### Frontend

React(React-router-dom, Context API), styled-components, netlify

### Backend

express, mongoDB, mongoose, JWT, PM2, AWS EC2, Github Actions

<br/>

## ✨ 구현 기능

### 1. 홈 / 풀이 검색

서비스의 메인 페이지로, 사용자들이 작성한 풀이를 검색하고 프로그래밍 언어 필터링을 적용하여 풀이를 빠르게 찾을 수 있습니다.

<img width="1000" alt="image (1)" src="https://user-images.githubusercontent.com/55647436/229362759-f4dc139b-7b29-46db-8d1b-ab99cd7eb34b.png">

**📌 세부 구현 사항**

- Intersection Observer를 이용해 무한스크롤 구현
- Debounce를 이용해 검색 기능의 UX 개선
- [cusotm hook](https://github.com/Hyeondoonge/Alog/blob/develop/client/src/hooks/useGetPost.js)을 활용해 코드 품질 향상
- LocalStorage를 이용해 선택된 필터 유지

### 2. 풀이 작성 및 수정

풀이를 작성하거나 수정할 수 있는 페이지입니다.

풀이를 작성할 문제 URL을 입력하면 플랫폼 및 문제 정보를 가져옵니다. Markdown형식으로 글을 작성할 수 있으며, 프리뷰를 볼 수 있는 기능을 제공합니다.

<img width="1000" alt="image (2)" src="https://user-images.githubusercontent.com/55647436/229362751-b3ff414d-27e9-4fc4-a3a4-3250be8da658.png">

**📌 세부 구현 사항**

- Auto Resizing되는 text area 구현
- Form 컴포넌트 재사용
- Media Query를 적용해 반응형 서비스 구현 => 모바일 버전에서 툴이 페이지 하단으로 이동

### 3. 풀이 조회

작성자가 등록한 풀이를 조회할 수 있습니다.

해당 페이지에서 작성자 본인에 한해 수정, 삭제가 가능하며
인증된 사용자라면 좋아요 기능을 이용할 수 있습니다.

![스크린샷 2023-11-02 오전 1 24 26](https://github.com/Hyeondoonge/Alog/assets/55647436/ed66ae79-c182-4c16-8982-d7a8a36e684a)

**📌 세부 구현 사항**

- 작성자 풀이 삭제 기능
- 인증된 사용자의 좋아요 / 좋아요 취소 기능

### 4. 마이 페이지

특정 작성자가 작성한 풀이를 볼 수 있습니다.

![스크린샷 2023-11-02 오전 1 23 11](https://github.com/Hyeondoonge/Alog/assets/55647436/d7f2e0e5-4e58-486e-950b-1ef8e8b75da7)

**📌 세부 구현 사항**

- 메인 페이지의 [cusotm hook](https://github.com/Hyeondoonge/Alog/blob/develop/client/src/hooks/useGetPost.js)을 재사용하여 풀이 조회 기능 구현 시 개발 생산성 향상
- 회원가입시 사용자가 등록한 이미지 로드

### 5. 가입 및 인증

카카오 계정을 통해 편리하게 서비스를 이용할 수 있습니다.

테스트 계정을 통해 서비스를 편하게 둘러볼 수도 있습니다.

![스크린샷 2023-11-02 오전 1 27 51](https://github.com/Hyeondoonge/Alog/assets/55647436/817b7980-53e2-4690-8ccb-8a82395d3f7f)

**📌 세부 구현 사항**

- 회원가입, 로그인, 로그이웃 구현
- OAuth와 JWT를 사용해 구현

<br/>

## 🔥 버그 및 성능 개선 기록

- [페이지 Lazy 로딩을 통한 성능 향상](https://github.com/Hyeondoonge/Alog/pull/91)
- [CRA 버전업에 따른 Buffer 모듈 사용 오류](https://github.com/Hyeondoonge/Alog/pull/87)
- [풀이 등록 폼 URL 입력 버그 해결](https://github.com/Hyeondoonge/Alog/pull/78)
