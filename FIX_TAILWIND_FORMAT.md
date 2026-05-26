# Tailwind 포맷 깨짐 해결

이 프로젝트는 Tailwind CSS 3.x 기준으로 고정했습니다.

## 기존 폴더에서 고치는 법

PowerShell에서 프로젝트 폴더 안에서 실행:

```powershell
Ctrl + C
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm.cmd install
npm.cmd run dev
```

## 원인

Tailwind CSS 최신 버전(v4)에서는 PostCSS 플러그인 설정 방식이 바뀌어서
기존 `@tailwind base; @tailwind components; @tailwind utilities;` 방식과 충돌할 수 있습니다.

그래서 `package.json`에 Tailwind를 `3.4.17`로 고정했습니다.
