<template>


  <form class="helloJake" action="">
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"><h2>Email address</h2></label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"><h2>Give us your feedback or review</h2></label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        <button class="submit">Submit Response</button>
        </div>
    </form>



</template>


<script>

</script>


<style>
.helloJake{
    margin-top: 207px;
    padding: 30px;
   
}

h2{
    border: solid #FF6C02;
    border-radius: 10px;
    padding: 3px;
    background-image: radial-gradient(#FFF9E9, #FF6C02);
}

.form-control{
    border-color: #FF6C02 ;
    border: solid;
    
}

.submit{
    margin: 9px;
    background-image: radial-gradient(#FFF9E9, #FF6C02);
    border-radius: 10px;
    border-color: #FF6C02;
    transition: transform ease-in 0.3s;
}

.submit:hover{
    transform: scale(1.1);
}


</style>
