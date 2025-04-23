# [4월 24일 챌린지28](./prisma/schema.prisma)

-   Prisma 초기화

    1. npm install prisma

        prisma 설치

    2. npx prisma init

        prisma 초기화

    3. npx prisma migrate dev

        db 업데이트

    4. npx prisma studio

        db ui로 확인

-   SQLite 로 프리즈마 초기화

    ```ts
    datasource db {
        provider = "sqlite"
        url      = env("DATABASE_URL")
    }
    ```

-   User 모델에는 username, password, email, bio, created_at updated_at 필드

    ```ts
    model User {
        id Int @id @default(autoincrement())
        username String
        password String
        email String?
        bio String?
        create_at DateTime @default(now())
        updated_at DateTime @updatedAt
        Tweet Tweet[]
        Like Like[]
    }
    ```

-   Tweet 모델에는 tweet, created_at 및 updated_at 필드, User 와의 관계

    User가 삭제 되도 Tweet는 남기기

    ```ts
    model Tweet {
        id         Int      @id @default(autoincrement())
        tweet      String
        create_at  DateTime @default(now())
        updated_at DateTime @updatedAt
        user       User?     @relation(fields: [userId], references: [id], onDelete: SetNull)
        userId     Int?
        Like       Like[]
    }
    ```

-   Like 모델에는 created_at 필드, User 및 Tweet과의 관계

    User 나 Tweet 가 삭제 되면 Like 삭제

    ```ts
    model Like {
        id        Int      @id @default(autoincrement())
        create_at DateTime @default(now())
        user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
        userId    Int
        tweet     Tweet    @relation(fields: [tweetId], references: [id], onDelete: Cascade)
        tweetId   Int
    }
    ```
