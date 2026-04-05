---
title: "Portfolio"
date: "2026-04-05"
description: "허진의 포트폴리오 페이지"
---

## 프로젝트 요약

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

## 프로젝트 문제 해결 

### 1. 역정규화 기반 집계 최적화를 통한 DB 병목 해소

>   트래픽 증가에 따라 선형적으로 커지던 COUNT 집계 부하를 줄이기 위해 역정규화 방식을 도입한 과정

#### 전체 아키텍처

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371036/portfolio/kjpvrikpatnxjv2fl1g1.avif)


#### 문제 상황

##### Grafana 대시보드  주요 지표 

![이미지 6](https://res.cloudinary.com/dtrxriyea/image/upload/v1769076925/load-test/ssvlathwfa6roopwqk0l.avif)



##### `docker stats` 주요 지표

| CONTAINER NAME      | CPU (Core) | MEM USAGE / LIMIT     | MEM %      |
| :------------------ | :--------- | :-------------------- | :--------- |
| nginx-container     | 0.008      | 13.38 MiB / 512 MiB   | 2.61%      |
| spring-container    | 0.070      | 542.4 MiB / 2 GiB     | 26.48%     |
| **mysql-container** | **1.285**  | **1.878 GiB / 2 GiB** | **93.91%** |



- cgroup 할당량 (1.25 Core)을 초과하는 CPU Peak 발생 (1.28 Core), 메모리 사용률 94% 도달
- 메인 화면 진입 시 필수적으로 호출되는 카테고리별 `COUNT` 집계 로직으로 인해, 트래픽 증가에 비례하여 DB Thread 경합 및 자원 고갈 유발

  - 조회 시점마다 O(N) 집계 연산이 발생해, 트래픽 증가에 따라 DB 부하도 선형적으로 증가


- 집계 결과를 컬럼으로 관리하는 역정규화 방식을 도입해 조회 쿼리 복잡도를 제거하고 DB 부하를 줄임
  - 대안 검토: 파티셔닝을 통한 인덱스 최적화를 고려했으나, 집계 연산 자체 비용 제거 불가
  - 조회 성능 개선의 한계로 인해, 정합성 관리 비용을 감수하고 역정규화 방식 채택

#### 개선 내용

- `Category` 테이블 역정규화를 위한 `post_count` 컬럼 추가,  `JOIN` 및 `COUNT` 집계 연산 제거를 통한 조회 성능 최적화
- 업데이트 전략:
  - 게시글 상태 변화(생성/삭제/이동) 시 카테고리별 `post_count` 실시간 동기화를 통한 데이터 최신성 유지
  - 배치 스케줄러를 활용한 주기적 재집계로 실시간 업데이트 시 발생 가능한 정합성 오류 보정 (write 기반 구조로 인한 불일치 대비)

- Querydsl 벌크 연산을 활용해 DB 부하를 최소화, 포스트의 상태 변화에 따른 카운트 필터링 로직 설계



#### 결과

##### 역정규화 적용 후 지표

| CONTAINER NAME   | CPU (Core) | MEM USAGE / LIMIT   | MEM %  |
| :--------------- | :--------- | :------------------ | :----- |
| nginx-container  | 0.0822     | 11.33 MiB / 512 MiB | 2.21%  |
| spring-container | 0.3948     | 451.6 MiB / 2 GiB   | 22.05% |
| mysql-container  | 0.2023     | 1.515 GiB / 2 GiB   | 75.77% |

- **부하 감소**: CPU 사용량 **84% 절감** (1.28 Core → 0.20 Core) 및 메모리 사용량 **18% 개선**
- **성능 안정화**: 450 OPS 부하 환경에서 **p95 응답 속도 92.22ms** 유지 및 처리량 안정성 확보
- **구조 개선**: 조회 시 COUNT 제거 -  $O(n)$ → $O(1)$ 조회 구조 전환


---


### 2. Connection Pool 병목 해소 및 응답 성능 개선

> 커넥션 획득 대기로 응답 지연이 누적되던 구조를 해소하기 위해 적정 Connection Pool 산정 기준을 도입한 과정

#### 문제 상황

##### Grafana 대시보드 주요 지표 

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371082/portfolio/ktugozaah98gkjywgfa3.avif)

- 500 OPS 고부하 환경에서 최대 175건의 `Pending Connection` 발생 및 처리량 저하 현상 확인

- I/O 바운드 작업 비중이 높은 서비스 특성에 비해 커넥션 풀 크기가 작아, 요청량 대비 커넥션 공급이 부족한 상태

- 평균 응답 시간(224 ms) 중 `Connection Acquire Wait`(180 ms)가 전체 지연의 80% 이상을 점유하는 병목 지점 확인

- 전체 응답 지연의 대부분이 DB 처리 시간이 아닌 커넥션 획득 대기에서 발생하는 구조 확인

  


#### 개선 내용

- Brian Goetz의 Connection Pool 산정 공식을 기반으로 CPU 코어 수와 I/O 대기 비율을 반영한 최적 풀 사이즈 산정 기준 적용
- 공식 : $$Pool Size = N_{cpu} \times (1 + \frac{W}{S})$$

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371116/portfolio/fpbkwskngcrnygtpfprp.avif)

- 모니터링 지표 기반 변수 산출:
  - **Wait Time (W)**: 210 ms (Grafana 및 모니터링 지표 기반 측정값: `Acquire Wait` 180 ms + DB I/O 대기 약 30 ms)
  - **Service Time (S)**: 14 ms (비즈니스 로직 수행 시간 기준 측정)

- 산출 결과(약 20)을 기준으로 `maximumPoolSize`를 기본값 10에서 상향 조정 (과도한 커넥션 증가로 인한 Context Switching 및 DB 부하 증가 방지)




#### 결과

- **응답 속도 개선**: p95 응답 시간 **1,145 ms → 87.66 ms (약 13배 단축)**
- **시스템 안정성**: 요청 누락 건수 **5,250건 → 146건 (97% 감소)**
- **인프라 효율화**: 동일 처리량 기준 필요 가상 사용자(VU) 45% 절감 (300 $\to$ 164)으로 시스템 자원 가동 효율 최적화
- **구조 개선**: Connection Pool 부족 상태 → 요청 대비 적정 커넥션 공급 상태로 전환
- **병목 해소**: `Connection Acquire Wait` 비중 감소로 응답 지연 주요 원인 제거

---

### 3. 다계층 캐시 도입을 통한 검색 자동완성 응답 속도 개선

> 반복 검색 연산으로 자동완성 응답이 저하되던 구조를 개선하기 위해 Caffeine·Redis 기반 다계층 캐시를 도입한 과정

#### 전체 아키텍처

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371144/portfolio/tsfbornegp1i6s5caimn.avif)



#### 문제 상황

- 자동완성 특성상 동일/유사 키워드에 대한 반복 요청이 발생하며, 매 요청마다 고비용 검색 연산 수행
- MongoDB Atlas Search 기반 연산이 요청마다 수행되어 트래픽 증가 시 비용 증가 및 병목 발생 구조
  - 동일 결과에 대해 반복적으로 DB 연산이 발생하는 비효율 구조

- 기존 DB 직접 조회 방식 사용 시 평균 응답 속도 856 ms 기록 및 UX 저해 확인




#### 개선 내용

- Cache-Aside 패턴을 기반으로 로컬 캐시(Caffeine)와 글로벌 캐시(Redis) 구조를 설계
- 단일 캐시로는 네트워크 비용 또는 데이터 공유 문제를 동시에 해결하기 어려워 다계층 캐시 구조 채택
- Local Cache (Caffeine)
  - 애플리케이션 메모리 내 직접 참조를 통한 네트워크 RTT 제거 및 저지연 응답 처리
  - 데이터 연산 비용 최소화 및 즉각적인 응답 속도 확보

- Global Cache (Redis)
  - 분산 환경에서 데이터 공유를 위한 캐시 계층으로 DB 조회 분산 및 캐시 히트율 확보
  - MongoDB Atlas Search의 검색 연산 부하 분산
- 캐시 정책: 데이터 신선도 유지를 위한 L1(Caffeine, 1m) 캐시와 적중률 향상을 위한 L2(Redis, 10m) 캐시의 다중 계층화로 검색 시스템 성능 최적화



#### 결과

- **성능 향상**: 평균 응답 속도 약 77% 개선 (856 ms $\to$ 194 ms)
- **단계적 개선**:
  - 글로벌 캐시 적용 시: DB 직접 조회 대비 응답 속도 49.8% 개선 (검색 연산 부하 분산)

  - 로컬 캐시 추가 적용: Redis 조회 대비 네트워크 RTT 제거로 추가 성능 향상
- **인프라 효율화**: 고비용 검색 연산의 캐싱 처리를 통해 DB 서버 가용성 확보 및 연산 부하 분산
- 조회 흐름을 DB 직접 조회 방식에서 Redis와 Caffeine을 거치는 다계층 캐시 구조로 전환
- 중복 검색 연산 제거를 통해 DB 부하 감소 및 검색 처리 비용 절감

---

### 4. No-Offset 적재와 LLM 기반 데이터 정제를 통한 대용량 데이터 처리 최적화

> 대용량 배치 처리의 재시작 한계와 비정형 데이터 정제 비용 문제를 해결하기 위해 No-offset 기반 적재와 LLM 배치 처리 방식을 도입한 과정

#### 전체 아키텍처

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371175/portfolio/l6l4ke34ny4gsebf87jl.avif)



#### 4-1. No-offset 기반 MongoDB 대용량 배치 처리

##### 문제 상황 

- MongoDB 커서 기반 스트리밍 방식 적용 시, 배치 장애 발생 지점 기록 및 재시작 처리에 한계가 존재
- 일반적인 페이징 방식에서는 페이지가 깊어질수록 Skip 연산으로 인해 $O(n)$ 스캔 비용이 발생




##### 개선 내용

- Spring Batch `ExecutionContext`에 마지막 처리 ID를 저장하는 No-offset 기반 `MongoPagingItemReader` 구현

- `ItemStream` 구현을 통해 인덱스 기반의 포인터 상태를 직접 관리하도록 설계



##### 결과

- **성능 일관성 확보**: 페이징 오버헤드를 제거하여 데이터 양에 관계없이 일정한 쿼리 성능을 유지
- **운영 안정성 구축**: 장애 시 메타데이터를 활용하여 중단 지점부터 즉시 재개 가능한 환경을 마련

---

#### 4-2. LLM 기반 비정형 데이터 구조화 및 배치 처리 최적화

##### 문제 상황 

- 비정형 크롤링 데이터는 노이즈가 많아, 정규표현식 기반 전처리만으로는 정제 정확도와 확장성을 확보하는 데 한계가 존재
- 수천 건의 데이터를 데이터별로 개별 LLM API 호출 방식으로 처리하면, 과도한 RTT와 누적 호출 비용으로 인해 성능 및 비용 병목이 발생



##### 개선 내용

- **Batch Prompting 최적화**: 단일 요청에 데이터를 N건씩 묶어 처리하여 API 호출 횟수를 축소하고 네트워크 RTT 오버헤드 극복
- LLM 반환 JSON 텍스트 정제 및 `ObjectMapper`를 활용한 자바 객체 역직렬화 적용
- **장애 격리 처리**: 일부 데이터 처리 실패 시 전체 배치가 중단되지 않도록, 실패 데이터를 별도 DB에 저장해 분리 관리하도록 구현



##### 결과

- **비용 및 속도 최적화**: 1:1 API 호출 대비 네트워크 비용을 50% 절감하고 전체 배치 지연 시간을 단축

- **데이터 품질 확보**: 불필요한 노이즈를 제거하여 서비스에 즉시 활용할 수 있는 정형 데이터셋을 구축

---

### 5. KSC 2024 논문 게재 및 발표 - JPA 1차 캐시 성능의 정량적 검증

> 실서비스 관점에서 1차 캐시의 실효성을 확인하기 위해 비교 실험을 수행하고 성능을 정량 분석한 과정

#### 실험 배경

- 단일 요청 내 동일 식별자 중복 조회가 드문 실제 서비스 환경에서 1차 캐시의 실효성 의문 발생
- 특정 시나리오를 구성해 캐시 히트율을 유도하고 성능 이점을 정량적으로 분석



#### 5-1. 쓰기(Insert) 로직 부하 상황 성능 비교

##### 전체 아키텍처

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371206/portfolio/ufgwwsu1xrbyl9wsyukj.avif)



##### 비교 실험 구성

- **Data JPA**: 1차 캐시 기반 내부 배치 처리 및 쓰기 지연 로직 적용
- **JPQL**: 영속성 컨텍스트 우회 및 즉시 쿼리 실행 방식으로 구성하여 대조



##### 결과

- **처리량 향상**: Data JPA(238.0 TPS)가 JPQL(197.8 TPS) 대비 약 20% 높은 처리량 기록

- **원인 분석**: 쓰기 지연을 통한 DB 네트워크 RTT 감소가 성능 향상의 핵심 요인

---

#### 5-2. 조회(Select) 로직 부하 상황 성능 비교

##### 전체 아키텍처

![이미지](https://res.cloudinary.com/dtrxriyea/image/upload/v1775371234/portfolio/petd48su0woc5uhbbgtw.avif)



##### 비교 실험 구성

- **Data JPA (1차 캐시)**: 트랜잭션 범위 내 동일 식별자 반복 조회 조건 구성
- **Spring Cache (로컬 캐시)**: `ConcurrentMapCacheManager`를 통한 애플리케이션 레벨 캐싱 대조군 설정 



##### 결과

- **성능 비교**: Spring Cache(991.1 TPS)가 1차 캐시(172.2 TPS) 대비 약 5.7배 높은 처리량 달성

- **원인 분석**: 1차 캐시는 트랜잭션 종료 시 소멸하여 매 요청마다 DB RTT가 발생하나, 로컬 캐시는 메모리 즉시 참조로 네트워크 오버헤드를 근본적으로 제거