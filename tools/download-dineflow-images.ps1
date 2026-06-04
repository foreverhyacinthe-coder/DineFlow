$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$target = Join-Path $root "Frontend\public\dineflow-images"
New-Item -ItemType Directory -Force -Path $target | Out-Null

$images = @(
  @{ Name = "hero-burger.jpg"; Url = "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=82" },
  @{ Name = "hero-chicken.jpg"; Url = "https://unsplash.com/photos/46i7Fqy4bto/download?force=true&w=1600" },
  @{ Name = "restaurant-dining-room.jpg"; Url = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=82" },
  @{ Name = "bar-lounge.jpg"; Url = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=82" },
  @{ Name = "plated-food.jpg"; Url = "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=82" },
  @{ Name = "professional-kitchen.jpg"; Url = "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=82" },
  @{ Name = "restaurant-map.jpg"; Url = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "truffle-burger.jpg"; Url = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "quinoa-bowl.jpg"; Url = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "king-crab.jpg"; Url = "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "miso-salmon.jpg"; Url = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "margherita-pizza.jpg"; Url = "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "ribeye-steak.jpg"; Url = "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "truffle-gnocchi.jpg"; Url = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "matcha-fondant.jpg"; Url = "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "sushi-restaurant.jpg"; Url = "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "vegan-restaurant.jpg"; Url = "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=82" },
  @{ Name = "mediterranean-grill.jpg"; Url = "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=1200&q=82" }
)

foreach ($image in $images) {
  $destination = Join-Path $target $image.Name
  if (Test-Path $destination) {
    Write-Host "Skipped $($image.Name)"
    continue
  }

  Invoke-WebRequest `
    -Uri $image.Url `
    -OutFile $destination `
    -TimeoutSec 45 `
    -Headers @{ "User-Agent" = "DineFlow asset downloader" }
  Write-Host "Downloaded $($image.Name)"
}
