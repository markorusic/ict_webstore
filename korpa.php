<?php
$page_title = "Korpa";
$page_description = "Sadrzaj korpe korisnika.";
include('header.php'); ?>

    <main class="cart">
        <!-- Hero Container -->
        <div class="hero-container hc-bg">
            <div class="hero-overlay-bg">
                <h1 class="hero-headline lobster">Vaša korpa</h1>            
            </div>
        </div>

        <div class="cart-content p-t-20">
            <div class="flex-center-res" id="main-row" style="align-items: flex-start;">
                <div class="p-20">
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

                <div class="p-20">
                    <h3>Unesite Vase podatke</h3>
                    <form class="login-form cache-out">
                        <input class="left" type="email" required placeholder="Email">
                        <input class="left" type="text" required placeholder="Ime i prezime">
                        <div>
                            <button class="btn-white left submit-cart" name="submit">Poruci</button>
                        </div>
                    </form>
                </div>
            </div>            
        </div>
    </main>

<?php include('footer.php') ?>