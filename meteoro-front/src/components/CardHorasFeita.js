import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";


const titleFontSize = "1rem";
const subtitleFontSize = "0.75rem";
const family = "'Open Sans', sans-serif";

const tutorInfoStyles = () => ({
  title: {
    fontFamily: family,
    color: "#4d4b5f",
    fontSize: titleFontSize,
    lineHeight: 1.2,
    fontWeight: 700,
    marginBottom: "0.125rem",
  },
  subtitle: {
    fontFamily: family,
    color: "#696c6f",
    fontWeight: 500,
    fontSize: subtitleFontSize,
    lineHeight: 1.4,
  },
});

const StyledIconButton = styled(IconButton)(() => ({
  backgroundColor: "#fff",
  boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
  color: "rgba(0, 0, 0, 0.54)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },
}));

function CardHorasFeita({ userankData, search2 }) {

  const usuarios = userankData.filter(user => user.Nome.toLowerCase().includes(search2) );
  return (
    <>
      {usuarios.map((user) => (
        <Box
          display="flex"
          p={1.5}
          maxWidth={350}
          gap={2}
          bgcolor={"#f5f5f5"}
          borderRadius={4}
          sx={{
            alignItems: "center", marginY: 1.0, marginX: 2.0, boxShadow:
              "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          }}
          key={user.Id}
        >
          <Box>
            <Avatar
              src={''}
              sx={{ borderRadius: 3, width: 48, height: 48 }}
            >E</Avatar>
          </Box>
          <Box sx={{ flex: "auto" }} useStyles={tutorInfoStyles}>
            <Typography>{user.Nome}</Typography>
            <Typography>{user.Cargo}</Typography>
            <>Horas Cumpridas: {user.horas}</>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default CardHorasFeita;