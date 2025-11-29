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
                  class="stagg-logo logo-large injectable"
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
                        <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="greens-fees.html"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Greens Fees</a
                          >
                        </li>
                        <li>
                          <a href="membership-fees.html"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Membership Fees</a
                          >
                        </li>
                        <li>
                          <a href="membership-fees.html#sunflower-trail"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Sunflower Trail</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a class="nav-link" href="pro-shop.html">Pro Shop</a>
                    </li>

                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        Leagues
                        <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="mens-league.html"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Men's League</a
                          >
                        </li>
                        <li>
                          <a href="womens-league.html"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Women's League</a
                          >
                        </li>
                        <li>
                          <a href="ladies-evening-league.html"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Ladies Evening League</a
                          >
                        </li>
                        <li>
                          <a href="couples-league.html"
                            ><svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>Couples League</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        Tournaments
                        <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="calendar.html"
                            >  <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg></i
                            >Calendar</a
                          >
                        </li>
                        <li>
                          <a href="open-tournaments.html"
                            >  <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg></i
                            >Open Tournaments</a
                          >
                        </li>
                        <li>
                          <a href="members-only-events.html"
                            >  <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg></i
                            >Members Only Events</a
                          >
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a class="nav-link" href="instruction.html"
                        >Instruction</a
                      >
                    </li>

                    <li class="has-dropdown ">
                      <a class="nav-link" href="#">
                        About
                        <svg
                          class="chevron chevron-down"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 294 294"
                        >
                          <path
                            d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                          />
                        </svg>
                      </a>
                      <ul class="submenu parent-nav with-border">
                        <li>
                          <a href="contact.html">
                            <svg
                              class="chevron chevron-right"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 294 294"
                            >
                              <path
                                d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                              />
                            </svg>
                            Contact
                          </a>
                        </li>
                        <li>
                          <a href="scorecard.html">
                            <svg
                              class="chevron chevron-down"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 294 294"
                            >
                              <path
                                d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                              />
                              </svg>Scorecard</a
                          >
                        </li>
                        <li>
                          <a href="meet-the-staff.html">
                            <svg
                              class="chevron chevron-down"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 294 294"
                            >
                              <path
                                d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                              /></svg>Meet the Staff</a
                          >
                        </li>
                        <li>
                          <a href="meet-the-staff.html#join-the-team">
                            <svg
                              class="chevron chevron-down"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 294 294"
                            >
                              <path
                                d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                              /></svg>Join Our Team</a
                          >
                        </li>
                        <li>
                          <a href="contact.html#donation-request">
                            <svg
                              class="chevron chevron-down"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 294 294"
                            >
                              <path
                                d="M259.9,215.4l-112.9-112.9-112.9,112.9-30.2-30.2,112.9-112.9c16.7-16.7,43.7-16.7,60.3,0l112.9,112.9-30.2,30.2Z"
                              /></svg>Donation Requests</a
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="button-area-right-header">
                <a
                  href="book-tee-time.html"
                  class="rts-btn btn-border header-btn"
                >
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
                    width="30"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="14" width="27" height="2" fill="#1F1F25"></rect>
                    <rect y="7" width="27" height="2" fill="#1F1F25"></rect>
                    <rect width="27" height="2" fill="#1F1F25"></rect>
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
