<?php
$page_title = "Korpa";
$page_description = "Sadrzaj korpe korisnika.";
include('header.php'); ?>

    <main class="cart">
        <!-- Hero Container -->
        <div class="hero-container hc-bg">
            <div class="hero-overlay-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="hero-headline lobster">Vaša korpa</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" style="padding-top: 20px;">
            <div class="row" id="main-row">
                <div class="col-12 col-lg-7 mx-auto">
                    <h3>Korpa</h3>
                    <table class='table table-hover'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th class="avatar-title"></th>
                            <th>Naziv</th>
                            <th class="text-center rl-like-count-title">Kolicina</th>
                            <th>Cena</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                                <td colspan="6">Ukupno: <span class="total-price"></span></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class="col-12 col-lg-4 mx-auto">
                    <h3>Unesite Vase podatke</h3>
                    <form class="login-form pt-4 pb-4 cache-out">
                        <input class="left" type="email" required placeholder="Email">
                        <input class="left" type="text" required placeholder="Ime i prezime">
                        <div class="clearfix">
                            <button class="btn-white left submit-cart" name="submit">Poruci</button>
                        </div>
                    </form>
                </div>
            </div>            
        </div>
    </main>

<?php include('footer.php') ?>