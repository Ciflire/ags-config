
# Minimal configuration for nix is 
```nix
# this is home manager module
# gtk.nix
{ pkgs, ... }:
{
  gtk = {
    enable = true;
    theme = {
      name = "adw-gtk3-dark";
      package = pkgs.adw-gtk3;
    };
    iconTheme = {
      name = "Adwaita";
      package = pkgs.gnome.adwaita-icon-theme;
    };
  };
}
```

```nix
# You need those lines for power management and tray icons
services.upower.enable = true;
services.gvfs.enable = true;
```
