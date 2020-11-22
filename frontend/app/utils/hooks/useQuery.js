import React from "react"
import { useLocation } from "react-router-dom"

export default () => {
    return new URLSearchParams(useLocation().search);
  }