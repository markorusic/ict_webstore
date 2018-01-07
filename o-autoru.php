<?php
$page_title = "O autoru";
$page_description = "Zovem se Marko Rusic, imam 19 godina, iz Beograda sam, student prve godine Visoke ICT skole, smer Internet tehnologije.";
include('header.php'); ?>

<main class="static-page o-autoru">
    <!-- Hero Container -->
    <div class="hero-container hc-bg">
        <div class="hero-overlay-bg">
            <div class="content-wrapper">
                <h1 class="hero-headline">O autoru</h1>
            </div>
        </div>
    </div>
    <!-- Hero Container END -->
    <div>
        <div class="flex-space-around-res">
            <article class="text-center">
                <div class="content-wrapper">

                    <img class="author-avatar-lg" src="https://avatars1.githubusercontent.com/u/25515080?s=460&v=4" alt="Avatar fotografija autora sajta.">
                    
                    <p style="font-size: 18px;font-weight: 400;">
                        Marko Rusic
                        <p><i class="fa fa-envelope-o" aria-hidden="true"></i> markousp5@gmail.com</p>
                        <p><i class="fa fa-id-card-o" aria-hidden="true"></i> Broj indeksa: 22/17</p>
                    </p>

                    <p>Imam 19 godina, iz Beograda sam, student prve godine Visoke ICT skole, smer Internet tehnologije. Aktivno se bavim veb programiranjem od treceg razreda srenje skole. Privi programski jezik koji me je ozbiljno zaniteresovao bio je Javascript, tako da sam se u pocetku fokusirao na front end, sve do trenutka u kom sam otkrio Node.js i uopste sve benefite vezane za bekend programiranje. Danas mogu reci za sebe da posedujem znanje u mnogim klijentskim i serverskim tehnologijama, neke od njih su: </p>
                </div>

                <!-- Contest Info -->
                <section class="flex-space-around-res text-center awards-section">

                    <div>
                        <article>
                            <h4>Javascript</h4>
                            <img class="author-tec-logo" src="./img/js-logo.png" alt="Javascript logo">
                            <ul class="list-reset">
                                <li><span class="square-ul"></span> Vanilla JS & jQuery</li>
                                <li><span class="square-ul"></span> Vue.js & Angular 1.x, 5+</li>
                                <li><span class="square-ul"></span> Node.js, Express, LoopBack</li>
                            </ul>
                        </article>
                    </div>
                    <div class="awards-line">
                        <article>
                            <h4>PHP, Laravel</h4>
                            <img class="author-tec-logo" src="./img/laravel-logo.svg" alt="Javascript logo">
                            <ul class="list-reset">
                                <li><span class="square-ul"></span> PHP</li>
                                <li><span class="square-ul"></span> Laravel</li>
                                <li><span class="square-ul"></span> APIs, REST, SOAP  </li>
                            </ul>
                        </article>
                    </div>
                    <div>
                        <article>
                            <h4>Baze podataka</h4>
                            <img class="author-tec-logo" src="./img/mongo-logo.jpg" alt="Javascript logo">
                            <ul class="list-reset">
                                <li><span class="square-ul"></span> NoSQL (MongoDB)</li>
                                <li><span class="square-ul"></span> RDBMS (MySql, PostgreSQL)</li>
                                <li><span class="square-ul"></span> Firebase</li>
                            </ul>
                        </article>
                    </div>
                </section>
                <div>
                    <p>Korisini linkovi:</p>
                    <div class="text-center contest-read-more">
                        <a href="https://github.com/markorusic" class="btn-yellow mr-md-2" target="_blank"> <i class="fa fa-github"></i> Github</a> 
                        <a href="https://codepen.io/marko123/" class="btn-yellow mr-md-2" target="_blank"> <i class="fa fa-codepen"></i> Codepen</a> 
                    </div>
                    <hr>
                    <p>Repozitorijum ovog sajta: <a href="https://github.com/markorusic/ict_webstore" target="_blank">https://github.com/markorusic/ict_webstore</a></p>
                </div>
            </article>

        </div>
    </div>


</main>
<?php include('footer.php') ?>
