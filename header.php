<!doctype html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Marko Rusic | <?php echo $page_title ?></title>
    <meta name="description" content="<?php echo $page_description ?>"/>
    <meta property="og:description" content="<?php echo $page_description ?>"/>
    <meta property="og:image" content="https://markorusic-247-store.herokuapp.com/img/main-hero-2.jpg" />

    <!-- FONT AWESOME  -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!-- CSS -->
    <link rel="stylesheet" href="css/main.css">

    <!-- FAVICON -->
    <link rel="shortcut icon" type="image/png" href="favicon.png"/>    
    <meta name="theme-color" content="#ffffff">
</head>
<body>

<!-- Main Header -->
<header class="main-header">
    <div>
        <div class="flex-space-around-res">
            <div class="flex-center md-order-1 md-abs-lt">
                <!-- Logo -->
                <a href="index.php" class="logo flex-center"><img src="img/logo-2.svg" alt="Logo 247 store"></a>
            </div>

            <div class="col-12 col-md-8 md-order-3 mobile-bt">
                <!-- Main Navigation -->
                <nav class="main-nav">
                    <ul class="list-reset">
                        <li><a href="index.php">Prodavnica</a></li>
                        <li><a href="korpa.php">Korpa<span class="cart-items-count"></span></a></li>
                        <li><a href="o-prodavnici.php">O prodavnici</a></li>
                    </ul>
                </nav>
                <!-- Main Navigation END -->
            </div>

            <div class="md-p-10 md-order-2 last-col">
                <ul class="list-reset log-reg">
                    <li><a href="#" class="open-login-modal">Prijava</a></li>
                    <li><a href="#" class="open-register-modal">Registracija</a></li>
                </ul>
            </div>            
        </div>
    </div>
</header>
<!-- Main Header END -->



<!-- MODAL - LOGIN -->
<div class="modal-mask login-modal" id="login-modal">
    <div class="modal-wrapper">
        <div class="modal-container">

            <div class="modal-header-ss">
                <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>                
                <h3 class="text-center">Prijava</h3>
            </div>

            <div class="modal-body">                
                <form action="" class="login-form">
                    <input type="email" required placeholder="Email">
                    <input type="password" required placeholder="Lozinka">
                    <button class="btn-white" name="submit">Prijavite se</button>
                </form>
            </div>

            <div class="modal-footer-ss">
                <div class="signup-strip">
                    <a href="#" class="btn-yellow">Registrujte se!</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- MODAL - LOGIN  END -->


<!-- MODAL - REGISTRACIJA -->
<div class="modal-mask login-modal reg-modal" id="register-modals">
    <div class="modal-wrapper">
        <div class="modal-container">

            <div class="modal-header-ss">
                <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>                
                <h3 class="text-center">Registracija</h3>
            </div>

            <div class="modal-body">

                <form action="" class="reg-form">
                    <div class="row">
                        <div class="col-12 col-md-6 mb-10">
                            <label for="">Ime i prezime</label>
                            <input type="text" required>
                        </div>

                        <div class="col-12 col-md-6 mb-10">
                            <label for="">E-mail</label>
                            <input type="email" required>
                        </div>

                        <div class="col-12 col-md-6 mb-10">
                            <label for="">Lozinka</label>
                            <input type="password" required>
                        </div>

                        <div class="col-12 col-md-6 mb-10">
                            <label for="">Ponovi lozinku</label>
                            <input type="password" required>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="reg-checkbox">
                            <input type="checkbox"><span>Prihvatam uslove koriscenja</span></a>
                        </div>
                        <div class="reg-checkbox">
                            <input type="checkbox" id="checkbox2" checked><span>Zelim da primam newsletter</span>
                        </div>

                        <button class="btn-white" name="submit">Registrujte se</button>
                    </div>

                </form>

            </div>

        </div>
    </div>
</div>