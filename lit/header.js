import { LitElement, html } from "../../assets/js/vendor/lit.js";

export class Header extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="header-wrapper-1">
              <a href="index.html" class="logo-area">
                <img
                  src="assets/images/logo/stagg-logo.svg"
                  class="stagg-logo logo-large"
                  alt="logo"
                />
                <img
                  src="assets/images/logo/stagg-logo.svg"
                  class="stagg-logo logo-small"
                  alt="logo"
                />
              </a>
              <div class="nav-area">
                <nav>
                  <ul>
                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        Fees
                        <i class="fa-duotone fa-regular fa-chevron-down"></i
                      ></a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="blog-list.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Daily Fees</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Membership Fees</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Sunflower Trail</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a class="nav-link" href="contact.html">Pro Shop</a>
                    </li>

                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        Leagues
                        <i class="fa-duotone fa-regular fa-chevron-down"></i
                      ></a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="blog-list.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Men's League</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Women's League</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Ladies Evening League</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Couples League</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        Tournaments
                        <i class="fa-duotone fa-regular fa-chevron-down"></i
                      ></a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="blog-list.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Calendar</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Open Tournaments</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Members Only Events</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Host a Tournament</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a class="nav-link" href="contact.html">Instruction</a>
                    </li>

                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        About
                        <i class="fa-duotone fa-regular fa-chevron-down"></i
                      ></a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="blog-list.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Contact</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Meet the Staff</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Join Our Team</a
                          >
                        </li>
                        <li>
                          <a href="blog-grid.html"
                            ><i class="fa-sharp fa-regular fa-chevron-right"></i
                            >Donation Requests</a
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="button-area-right-header">
                <a href="contact.html" class="rts-btn btn-border header-btn">
                  Book Tee Time
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    data-inject-url="https://html.themewant.com/luminos/assets/images/service/icons/13.svg"
                    class="injectable"
                  >
                    <path
                      d="M9.3335 22.6667L22.6668 9.33337M22.6668 9.33337H9.3335M22.6668 9.33337V22.6667"
                      stroke="#999999"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </a>
                <div class="menu-btn-toggle">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="14" width="20" height="2" fill="#1F1F25"></rect>
                    <rect y="7" width="20" height="2" fill="#1F1F25"></rect>
                    <rect width="20" height="2" fill="#1F1F25"></rect>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("my-header", Header);
