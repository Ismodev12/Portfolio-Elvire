New-Item -ItemType Directory -Force -Path 'src\assets\tech-logos' | Out-Null
New-Item -ItemType Directory -Force -Path 'src\assets\images\portrait' | Out-Null

$moves = @(
  @('public\python.jpg',                       'src\assets\tech-logos\python.jpg'),
  @('public\django.webp',                      'src\assets\tech-logos\django.webp'),
  @('public\fast api.webp',                    'src\assets\tech-logos\fastapi.webp'),
  @('public\flask.svg',                        'src\assets\tech-logos\flask.svg'),
  @('public\GraphQL_Logo.svg.png',             'src\assets\tech-logos\graphql.png'),
  @('public\React-icon.svg.png',               'src\assets\tech-logos\react.png'),
  @('public\javascript-logo.svg',              'src\assets\tech-logos\javascript.svg'),
  @('public\Tailwind_CSS_Logo.svg.png',        'src\assets\tech-logos\tailwind.png'),
  @('public\Typescript_logo_2020.svg.png',     'src\assets\tech-logos\typescript.png'),
  @('public\next-js.svg',                      'src\assets\tech-logos\nextjs.svg'),
  @('public\HTML5_logo_and_wordmark.svg.png',  'src\assets\tech-logos\html5.png'),
  @('public\Postgresql_elephant.svg.png',      'src\assets\tech-logos\postgresql.png'),
  @('public\mysql-logo.svg',                   'src\assets\tech-logos\mysql.svg'),
  @('public\redis-logo.svg',                   'src\assets\tech-logos\redis.svg'),
  @('public\mongodb-icon-1.svg',               'src\assets\tech-logos\mongodb.svg'),
  @('public\docker.png',                       'src\assets\tech-logos\docker.png'),
  @('public\github.svg',                       'src\assets\tech-logos\github.svg'),
  @('public\linux.png',                        'src\assets\tech-logos\linux.png'),
  @('public\ci-cd.svg',                        'src\assets\tech-logos\ci-cd.svg'),
  @('public\nginx-ifln2zy9rfx05a4ec36x.webp',  'src\assets\tech-logos\nginx.webp'),
  @('src\assets\images\elvire_new.png',        'src\assets\images\portrait\elvire-portrait.png'),
  @('src\assets\images\elvire_hero2.png',      'src\assets\images\portrait\elvire-about.png'),
  @('public\chat-bot-stroke-standard-512.webp','src\assets\images\chatbot-icon.webp')
)

foreach ($pair in $moves) {
  $src = $pair[0]
  $dst = $pair[1]
  if (Test-Path $src) {
    Move-Item -Path $src -Destination $dst -Force
    Write-Host "Moved: $src -> $dst"
  } else {
    Write-Host "Skip (not found): $src"
  }
}

$toDelete = @('public\images.png','src\assets\react.svg','src\assets\vite.svg','src\assets\hero.png')
foreach ($f in $toDelete) {
  if (Test-Path $f) {
    Remove-Item $f -Force
    Write-Host "Deleted: $f"
  }
}

Write-Host "Done!"
