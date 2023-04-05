# ALOG

2021년 9월부터 2022년 1월까지 약 4개월간, 기획부터 배포까지 개인으로 진행한 프로젝트입니다.

다양한 코드 채점 플랫폼에서 제공하는 문제의 풀이를 기록하고, 원하는 문제의 풀이를 찾도록하는 웹 서비스를 제공합니다.

## 사용 기술

### Frontend

React, Context API, styled-components, netlify

### Backend

express, mongoDB, mongoose, jwt, pm2, aws ec2

## 주요 기능

### 1. 홈 / 풀이 검색

서비스의 메인 페이지입니다.

사용자들이 작성한 풀이를 검색하고, 프로그래밍 언어 필터링을 적용하여 풀이를 빠르게 찾을 수 있습니다.

**세부 구현 사항**

- Intersection Observer를 이용해 무한스크롤 구현
- Debounce를 이용해 검색 기능의 UX 개선
- 사용자 정의 hook을 활용해 코드 품질 향상
- LocalStorage를 이용해 선택된 필터 유지

<img width="1000" alt="image (1)" src="https://user-images.githubusercontent.com/55647436/229362759-f4dc139b-7b29-46db-8d1b-ab99cd7eb34b.png">

### 2. 풀이 작성 및 수정

풀이를 작성하거나 수정할 수 있는 페이지입니다.

URL 입력 시 플랫폼 및 문제 정보를 가져옵니다. Markdown형식으로 글을 작성할 수 있으며, 프리뷰를 볼 수 있는 기능을 제공합니다.

**세부 구현 사항**

- media query를 적용해 반응형으로 동작하도록 구현
- 높이가 동적으로 조절되는 text area 구현

<img width="1000" alt="image (2)" src="https://user-images.githubusercontent.com/55647436/229362751-b3ff414d-27e9-4fc4-a3a4-3250be8da658.png">

### 3. SNS으로 가입 / 로그인

카카오 계정을 통해 편리하게 서비스를 이용할 수 있습니다.

**세부 구현 사항**

- jwt으로 sns 로그인 기능을 구현하며, 토큰 기반 인증 방식에 대해 이해

### 4. 배포

API 서버는 aws ec2, 웹 사이트는 netlify를 통해 배포되어있습니다.

**세부 구현 사항**

- Github actions를 이용한 서버 배포 자동화를 통해 개발 생산성 향상
