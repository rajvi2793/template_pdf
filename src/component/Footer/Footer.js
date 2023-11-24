
import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-links">
          <ul>
            <li>
              <Link> Home</Link>
            </li>
            <li>
              <Link> Features</Link>
            </li>
            <li>
              <Link> Pricing</Link>
            </li>
            <li>
              <Link> Tools</Link>
            </li>
            <li>
              <Link> FAQ</Link>
            </li>
          </ul>
        </div>
        <div class="footer-links">
          <ul>
            <li>
              <Link> iLovePDF Desktop</Link>
            </li>
            <li>
              <Link> iLovePDF Mobile</Link>
            </li>
            <li>
              <Link> Developers</Link>
            </li>
            <li>
              <Link> Wordpress Plugin</Link>
            </li>
            <li>
              <Link> iloveimg.com</Link>
            </li>
          </ul>
        </div>
        <div class="footer-links">
          <ul>
            <li>
              <Link>Business</Link>
            </li>
            <li>
              <Link>Education</Link>
            </li>
          </ul>
        </div>
        <div class="footer-links">
          <ul>
            <li>
              <Link>Our Story</Link>
            </li>
            <li>
              <Link>Blog</Link>
            </li>
            <li>
              <Link>Press</Link>
            </li>
            <li>
              <Link>Legal & Privacy</Link>
            </li>
            <li>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2023 XYZ. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
