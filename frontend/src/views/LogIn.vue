<template>
<div class="container">
  
</div>

<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">Login</div>
  <div class="card-body">
    
    <form class="logIn">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Remember me</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> 

  </div>
</div>




</template>

<style>

.card{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: radial-gradient(#FFF9E9, #FF6C02);
  box-shadow: 4px 3px #000;

}

label{
  color: black;
}

.card-header{
  color: #198754;
  font-size: larger;
  font-weight: bolder;
}

.btn{
  background-color: #198754;
  border-color: #000;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: all ease 0.3s;
}

.btn:hover{
  background-color: #000;
  border-color: #198754;
  color: #198754;
  font-weight: bolder;
  transform: translateY(-3px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3)
}

</style>