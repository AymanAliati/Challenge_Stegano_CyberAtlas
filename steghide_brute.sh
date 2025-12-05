#!/bin/bash

IMAGE="/home/kali/Desktop/nom.jpeg"   # <-- Remplace par ton image
WORDLIST="/home/kali/Desktop/nom.txt" # <-Remplace par ton wordlist 
OUTPUT_FILE="extracted.txt"

# === Vérifications de base ===
if [ ! -f "$IMAGE" ]; then
    echo "❌ Erreur : L'image '$IMAGE' est introuvable."
    exit 1
fi

if [ ! -f "$WORDLIST" ]; then
    echo "❌ Erreur : La wordlist '$WORDLIST' est introuvable."
    exit 1
fi

# Effacer l'ancien fichier extrait (optionnel)
rm -f "$OUTPUT_FILE"

echo "🔍 Démarrage de l'attaque Steghide sur : $IMAGE"
echo "📚 Wordlist utilisée : $WORDLIST"
echo "📤 Fichier extrait sera sauvegardé dans : $OUTPUT_FILE"
echo "⏳ Chronomètre lancé..."
echo ""

SECONDS=0
count=0

while IFS= read -r password; do
    ((count++))

    # Tentative d'extraction avec le mot de passe courant
    steghide extract -sf "$IMAGE" -p "$password" -xf "$OUTPUT_FILE" 2>/dev/null

    if [ $? -eq 0 ]; then
        elapsed_seconds=$SECONDS
        hours=$((elapsed_seconds / 3600))
        minutes=$(( (elapsed_seconds % 3600) / 60 ))
        seconds=$((elapsed_seconds % 60))

        echo ""
        echo "###################################################################"
        echo "✅ SUCCÈS ! Mot de passe trouvé : '$password'"
        echo "📁 Fichier caché extrait avec succès vers : '$OUTPUT_FILE'"
        printf "⏱️  Temps total : %02d h %02d min %02d sec\n" $hours $minutes $seconds
        echo "📊 Nombre de tentatives : $count"
        echo "###################################################################"
        exit 0
    fi

    # Affichage de progression toutes les 100 tentatives
    if (( count % 100 == 0 )); then
        echo "🔄 Tentative n°$count : '$password'"
    fi

done < "$WORDLIST"

# Si on arrive ici, aucun mot de passe n'a fonctionné
echo ""
echo "❌ Échec : Aucun mot de passe valide dans la wordlist."
echo "📁 Aucun fichier n'a été extrait."
echo "📊 Nombre total de tentatives : $count"
