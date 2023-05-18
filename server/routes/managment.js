import express from "express";

const managmentRoutes = express.Router();
managmentRoutes.get("/a", (req,res) => {
    res.status(200).json({name:'babuje'})
});

export default managmentRoutes;