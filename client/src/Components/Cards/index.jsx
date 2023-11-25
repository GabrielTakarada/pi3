import React from "react";
import VanillaTilt from "vanilla-tilt"; // Importe a biblioteca VanillaTilt
import { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import fone from "../../assets/fone.png";
import {
  cardStyle,
  imageStyle,
  cardMediaStyle,
  buttonContainerStyle,
} from "./style";
import { Divider } from "@mui/material";

export default function MediaCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [name, setName] = useState();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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
      <img src={fone} alt="Fone" style={imageStyle}></img>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estes são os fones de ouvido ultrablaster de ultima geração da marca
          JBL em perfeito estado
        </Typography>
      </CardContent>
      <Divider></Divider>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
          <FavoriteIcon style={favoriteIconStyle} />
        </IconButton>
        <IconButton style={buttonContainerStyle}>
          <Link to="/profile">
            <Button size="small">Detalhes</Button>
          </Link>
        </IconButton>
      </CardActions>
      <CardMedia sx={cardMediaStyle} title="fone de ouvido" />
    </Card>
  );
}
