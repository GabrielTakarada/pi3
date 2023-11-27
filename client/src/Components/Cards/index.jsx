import React from "react";
import VanillaTilt from "vanilla-tilt"; // Importe a biblioteca VanillaTilt
import { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { cardStyle, imageStyle } from "./style";
import { Divider } from "@mui/material";

export default function MediaCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Atualizar a prévia da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Selecione uma imagem para enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(
        `Imagem enviada com sucesso! Caminho da imagem no servidor: ${data.imagePath}`
      );

      setIsImageUploaded(true);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    }
  };

  const handleImageChangeAgain = () => {
    setImage(null);
    setPreview(null);
    setIsImageUploaded(false);
  };

  const favoriteIconStyle = {
    color: isFavorite ? "red" : "inherit",
  };

  const cardRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Inicialize o VanillaTilt no elemento do cartão
    VanillaTilt.init(cardRef.current, {
      max: -7,
      speed: 800,
      glare: true,
      "max-glare": 0.4,
    });
  }, []);

  useEffect(() => {
    const card = cardRef.current;

    card.addEventListener("mousemove", (event) => {
      const boundingBox = card.getBoundingClientRect();
      const mouseX = event.clientX - boundingBox.left;
      const mouseY = event.clientY - boundingBox.top;

      const tiltX = (mouseX / boundingBox.width) * 2 - 1;
      const tiltY = (mouseY / boundingBox.height) * 2 - 1;

      card.style.boxShadow = `${-tiltX * 10}px ${
        -tiltY * 10
      }px 13px 4.5px #0004`;
    });

    card.addEventListener("mouseout", () => {
      card.style.boxShadow = "none";
    });
  }, [isHovered]);

  return (
    <Card
      sx={cardStyle}
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={preview} alt="Preview" style={imageStyle} />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={imageStyle}
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Enviar Imagem</button>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"></Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <Divider></Divider>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
          <FavoriteIcon style={favoriteIconStyle} />
        </IconButton>
      </CardActions>

      {isImageUploaded && (
        <>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {/* Nome ou outros detalhes do card */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* Descrição do card */}
            </Typography>
          </CardContent>
          <Divider></Divider>
          <CardActions>
            <button onClick={handleImageChangeAgain}>Trocar</button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
