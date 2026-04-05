---
title: "Portfolio"
date: "2026-04-05"
description: "허진의 포트폴리오 페이지"
---

## 프로젝트

### [개인 프로젝트] 온프레미스 아키텍처 기반 블로그 플랫폼

**일정**: 2025.04 ~ 2025.11

**기술 스택**: Spring Boot, MySQL, Docker, Nginx, GitHub Actions, Prometheus, Grafana, k6

**소개**: 온프레미스 환경 기반 설계 및 대용량 트래픽 처리 최적화 블로그 플랫폼

- **DB 병목 해소**: 실시간 COUNT 쿼리 반정규화 및 배치 정합성 보정 로직 도입 (처리량 4.5배 향상, p95 92.22ms 달성)
- **DB 커넥션 고갈 방지**: HikariCP 설정 튜닝으로 고부하 환경에서 실패율 97% 감소, p95 응답 시간 13배 개선
- **네트워크 오버헤드 제거**: Nginx-Tomcat 간 upstream keepalive설정으로 반복적인 TCP 연결 수립 비용 절감, Tomcat 활성 스레드 점유율 60% 감소
- **OOM 방지용 메모리 최적화**: 게시글 원문 비교 대신 SHA-256 해시 비교 방식 도입으로 메모리 사용량 절감 및 I/O 비용 감소
- **CI/CD 파이프라인 최적화**: Docker BuildKit 캐시와 multi-stage 빌드 적용 (빌드/배포 시간 72% 단축, 런타임 이미지 20% 경량화)
- **웹 성능 개선**: 이미지 포맷 AVIF 전환으로 용량 85.4% 절감 및 로딩 속도 5배 개선 (132ms -> 26ms)
- **외부 접속 환경 개선**: DDNS·Nginx 및 Let’s Encrypt 적용으로 유동 IP 환경의 외부 접속 문제 해결

**관련 링크** | [블로그 서비스 웹사이트](https://heojin.vercel.app/) | [블로그 백엔드 GitHub](https://github.com/Kimheojin/spring-blog-backend.git)

---

### [개인 프로젝트] NoSQL 기반 레시피 데이터 검색 플랫폼

**일정**: 2025.09 ~ 2025.12

**기술 스택**: Spring Boot, MongoDB, Caffeine, Redis, Spring Batch, MySQL, MongoDB Atlas Search

**소개**: MongoDB 집계 파이프라인 최적화와 텍스트 인덱싱 전략을 적용한 통합 검색 플랫폼

- **검색 응답 속도 개선**: Caffeine, Redis 계층형 캐시 도입으로 검색 자동완성 응답 지연 시간 77% 단축 (856ms → 194ms)
- **검색 품질 고도화**: 한글 형태소 처리를 위한 Apache Nori 및 edge_ngram 기반 인덱싱 전략 수립, Aggregation 파이프라인 개선을 통한 한글 검색 정확도 개선
- **크롤링 데이터 정제 파이프라인 구축**: 원본 데이터 노이즈 제거를 위한 Spring Batch와 LLM(Gemma3) 연동, No-Offset 조회 및 Batch Prompting 적용
- **비로그인 사용자 경험 개선을 위한 식별 구조 설계**: Spring Interceptor와 UUID 쿠키 기반으로 서버 세션 의존성을 제거, 좋아요·북마크 기능 구현

**관련 링크** | [레시피 서비스 웹사이트](https://recipefinder-hj.vercel.app/) | [레시피 백엔드 GitHub](https://github.com/Kimheojin/spring-recipe-backend.git)

---

### [팀 프로젝트] 도서 추천 및 공공 도서관 연계 플랫폼 (학부 졸업 프로젝트)

**일정**: 2024.03 ~ 2024.10

**참여 인원**: 3인 (백엔드 및 데이터 스크래핑 담당)

**기술 스택**: Spring Boot, Spring Security, MySQL, Redis, AWS, Apache JMeter

**소개**: 공공 도서관 실시간 소장 정보 연계 서비스 및 Spring/JPA 캐시 성능 검증 연구 (KSC 2024 논문 게재)

- **공공 도서관 소장 정보 연계 서비스 개발**: 도서관별 소장 정보를 실시간 수집·가공하여 서비스와 연동하는 데이터 파이프라인 구축

- **캐시 전략 성능 검증 연구 수행**: Spring Data JPA, JPQL, Spring Cache Manager 비교군 설계 및 AOP 기반 SQL 실행 흐름 분석
- **쓰기 처리 최적화 효과 검증**: Write-Behind 및 Batch Insert 기반 튜닝으로 JPQL 대비 처리량 20% 향상 (197.8 → 238.0 req/sec)
- **조회 성능 개선 효과 검증**: Spring Cache Manager 적용 시 DB I/O 및 네트워크 왕복 감소를 통해 처리량 5.7배 향상 (172.2 → 991.1 req/sec)
- **연구 성과**: 프로젝트 코드를 통한 성능 실험 및 분석 결과를 바탕으로 **KSC 2024 논문 게재**

**관련 링크** | [RISS 학술지 색인](https://www.riss.kr/search/detail/DetailView.do?p_mat_type=1a0202e37d52c72d&control_no=cd9dc3cecb211246b7998d826d417196&keyword=) | [도서 백엔드 GitHub](https://github.com/Kimheojin/spring-checkitout-backend.git)

---
## 문제 해결 중심