import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className="title">
        Quizki
      </NavLink>
      <ul>
        <li>
          <NavLink
            to="/study"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Study
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/flashcards"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Flashcards
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Edit Flashcards
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/collection"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Collection
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gacha"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Gacha
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
