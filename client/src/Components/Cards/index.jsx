import React from "react";
import VanillaTilt from "vanilla-tilt";
import { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { cardStyle, imageStyle } from "./style";
import { Box, Divider } from "@mui/material";

export default function MediaCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");

  const handleImageChange = (e) => {
    setImage(null);
    setPreview(null);
    setIsImageUploaded(false);
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Selecione uma imagem para enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("info1", info1);
    formData.append("info2", info2);

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

      const updateResponse = await fetch(
        "http://localhost:3001/updateCardInfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const updateData = await updateResponse.json();
      console.log(updateData);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={preview} alt="Imagem" style={imageStyle} />
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            style={{
              width: "80px",
              height: "30px",
              backgroundColor: "brown",
              color: "white",
              borderRadius: "7px",
              border: "none",
              fontFamily: "monospace",
            }}
            onClick={handleUpload}
          >
            Enviar
          </button>
        </div>

        <CardContent
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "2",
            marginLeft: "4%",
          }}
        >
          <Box>
            <Box>
              {editMode ? (
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ marginRight: "7%" }}
                >
                  <TextField
                    label="Contato"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Typography>
              ) : (
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ textAlign: "center" }}
                >
                  {title}
                </Typography>
              )}
              {editMode ? (
                <Typography variant="body2" color="text.secondary">
                  <TextField
                    label="Descrição"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
            <Typography style={{ textAlign: "center" }}>(Pedidos)</Typography>
            <Box>
              {editMode ? (
                <Typography variant="body2" color="text.secondary">
                  <TextField
                    label="Info 1"
                    value={info1}
                    onChange={(e) => setInfo1(e.target.value)}
                  />
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ textAlign: "center" }}
                >
                  {info1}
                </Typography>
              )}
              {editMode ? (
                <Typography variant="body2" color="text.secondary">
                  <TextField
                    label="Info 2"
                    value={info2}
                    onChange={(e) => setInfo2(e.target.value)}
                  />
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ textAlign: "center" }}
                >
                  {info2}
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
        <Divider></Divider>
        <Divider></Divider>
        <CardActions>
          <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
            <FavoriteIcon style={favoriteIconStyle} />
          </IconButton>
          <button
            onClick={toggleEditMode}
            style={{
              width: "105px",
              height: "30px",
              backgroundColor: "brown",
              color: "white",
              borderRadius: "7px",
              border: "none",
              fontFamily: "monospace",
            }}
          >
            {editMode ? "Visualizar" : "Editar"}
          </button>
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
              <button
                onClick={handleImageChangeAgain}
                style={{
                  width: "80px",
                  height: "30px",
                  backgroundColor: "brown",
                  color: "white",
                  borderRadius: "7px",
                  border: "none",
                  fontFamily: "monospace",
                }}
              >
                Trocar
              </button>
            </CardActions>
          </>
        )}
      </div>
    </Card>
  );
}
