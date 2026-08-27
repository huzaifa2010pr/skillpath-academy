/* =====================================================
   SKILLPATH ACADEMY
   Professional JavaScript
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

if (menuButton && navbar) {

  menuButton.addEventListener("click", () => {

    const isOpen = navbar.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen
    );

  });

}


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

const navLinks = document.querySelectorAll(".nav-link, .nav-button");

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    navbar?.classList.remove("open");

    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

const navigationLinks =
  document.querySelectorAll(".nav-link");

const updateActiveLink = () => {

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {

      currentSection = section.getAttribute("id");

    }

  });

  navigationLinks.forEach((link) => {

    link.classList.remove("active");

    const target =
      link.getAttribute("href");

    if (target === `#${currentSection}`) {
      link.classList.add("active");
    }

  });

};

window.addEventListener(
  "scroll",
  updateActiveLink
);


/* =====================================================
   HEADER SHADOW ON SCROLL
===================================================== */

const header =
  document.getElementById("header");

const updateHeader = () => {

  if (!header) return;

  if (window.scrollY > 20) {

    header.style.boxShadow =
      "0 8px 30px rgba(15, 23, 42, 0.06)";

  } else {

    header.style.boxShadow = "none";

  }

};

window.addEventListener(
  "scroll",
  updateHeader
);


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const animatedElements =
  document.querySelectorAll(
    ".course-card, .feature-card, .roadmap-step"
  );

const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


animatedElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const currentYear =
  document.getElementById("currentYear");

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {

    anchor.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
  "click",
  (event) => {

    if (
      !navbar ||
      !menuButton
    ) {
      return;
    }

    const clickedInsideNavbar =
      navbar.contains(event.target);

    const clickedMenuButton =
      menuButton.contains(event.target);

    if (
      !clickedInsideNavbar &&
      !clickedMenuButton
    ) {

      navbar.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* =====================================================
   INITIALIZE
===================================================== */

updateActiveLink();
updateHeader();
/* =====================================================
   POSTS SEARCH
===================================================== */

const postSearch =
    document.getElementById("postSearch");

const clearSearch =
    document.getElementById("clearSearch");

const posts =
    document.querySelectorAll(".post-card");

const noResults =
    document.getElementById("noResults");

const searchResult =
    document.getElementById("searchResult");


function searchPosts() {

    const searchTerm =
        postSearch.value
            .toLowerCase()
            .trim();

    let visiblePosts = 0;


    posts.forEach((post) => {

        const title =
            post.dataset.title
                ?.toLowerCase() || "";

        const category =
            post.dataset.category
                ?.toLowerCase() || "";

        const tags =
            post.dataset.tags
                ?.toLowerCase() || "";

        const content =
            post.textContent
                .toLowerCase();

        const searchableText =
            `${title} ${category} ${tags} ${content}`;


        const matches =
            searchableText.includes(searchTerm);


        if (matches) {

            post.classList.remove("hidden");

            visiblePosts++;

        } else {

            post.classList.add("hidden");

        }

    });


    /* SEARCH RESULT TEXT */

    if (searchTerm === "") {

        searchResult.textContent =
            `Showing ${posts.length} posts`;

    } else if (visiblePosts === 0) {

        searchResult.textContent =
            "No matching posts found";

    } else {

        searchResult.textContent =
            `Found ${visiblePosts} ${
                visiblePosts === 1
                    ? "post"
                    : "posts"
            }`;

    }


    /* NO RESULTS MESSAGE */

    if (visiblePosts === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }


    /* CLEAR BUTTON */

    if (searchTerm.length > 0) {

        clearSearch.style.display =
            "grid";

    } else {

        clearSearch.style.display =
            "none";

    }

}


/* SEARCH WHILE TYPING */

postSearch?.addEventListener(
    "input",
    searchPosts
);


/* CLEAR SEARCH */

clearSearch?.addEventListener(
    "click",
    () => {

        postSearch.value = "";

        searchPosts();

        postSearch.focus();

    }
);
