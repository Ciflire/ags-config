# flake.nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      #       ↑ Swap it for your system if needed
      #       "aarch64-linux" / "x86_64-darwin" / "aarch64-darwin"

      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default =
        pkgs.mkShell # .override { stdenv = pkgs.clangStdenv; } # for C dev
          {
            packages = with pkgs; [
              vscode-langservers-extracted
              nodePackages_latest.typescript-language-server

              nodejs

              gtksourceview
              webkitgtk
              accountsservice
            ];
            shellHook = "";
          };
    };
}
