import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const links = [
    { name: "Home", link: "/" },
    { name: "Tv shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "MyList", link: "/my-list" },
  ];
  const naviaget = useNavigate();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) naviaget("/login");
  });

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <ul className="links flex">
            {links.map((currlink, index) => {
              const { name, link } = currlink;
              return (
                <li key={index}>
                  <Link to={link} style={{ color: "white" }}>
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch></FaSearch>
            </button>
            <input
              type="text"
              placeholder="search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff></FaPowerOff>
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: #000;
  }
  nav {
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 999;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        gap: 2rem;
        list-style: none;
        li {
          a {
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      .search {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
        padding: 0.2rem;
        padding-left: 0.5rem;
        transition: 0.5s ease-in-out;
        button {
          background-color: transparent;
          svg {
            color: #ffffff;
          }
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.5s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: (0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default Navbar;
