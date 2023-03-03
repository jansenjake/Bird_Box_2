<template>
<nav class="navbar navbar-light bg-success fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="/HomeView"><img class="brand" src="../assets/glow.png" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header bg-success">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Bird Box</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body bg-dark">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 ">
          <li class="nav-item">
            <a class="nav-link active text-light" aria-current="page" href="../views/HomeView.vue">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active text-light" href="/Products">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active text-light" href="/contact">Contact Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active text-light" href="/login">Login</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="login">

        </div>
      </div>
    </div>
  </div>
</nav>

</template>

<style>

.modal-backdrop {
  z-index: -5 !important;
}

.nav-item:hover{
  background-color: #198754;
  border-radius: 10px;
  padding-left: 5px;
  transition: ease-in 0.5s;
}

form{
  margin-top: 10px;
}

.brand{
  width: 40px;
  margin: 0;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
}

.brand:hover{
  transform: rotate(360deg);
}

</style>
