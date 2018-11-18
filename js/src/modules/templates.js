export default {
  article: ({ img, price, stars, name }) => `
    <div class="store-item-wrapper">
        <article class="store-articles-list-item"
                style="background-image: url('${img}');">
            <div class="cpli-overlay"><!-- class overlay --></div>
            <div class="cpli-content">
                <div class="article-info-strip">
                    <div>
                        <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>
                        <span>${price}</span>
                    </div>
                    <div>
                        <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                        <span>${stars}</span>
                    </div>
                </div>
                <div class="text-center store-article-info">
                    <p class="font-16">${name}</p>
                    <a href="#" class="btn-white add-to-cart">
                        <i class="fa fa-cart-plus font-15" aria-hidden="true"></i> | <span class="content">Dodaj u korpu</span></a>
                </div>
            </div>
        </article>
    </div>
    `,

  articleTr: ({ img, count, name, price }, num) => `
    <tr>
        <td>#${num}</td>
        <td class="rl-avatar-td">
            <a href="#">
                <div class="article-avatar"
                    style="background-image: url('${img}');"></div>
            </a>
        </td>
        <td>
            <span>
                ${name}
            </span>
        </td>
        <td>${count}</td>
        <td>${price * count}</td>
        <td>
            <a href="#" class="remove-form-cart btn btn-danger-btn-sm"><i class="fa fa-times"></i></a>
        </td>
    </tr>
    `,

  articleTrPopover: ({ img, name, count, price }) => `
    <tr>
        <td>
            <a href="#">
                <div class="article-avatar" style="background-image: url('${img}');"></div>
            </a>
        </td>
        <td>${name}</td>
        <td>${count}</td>
        <td>${price * count}</td>
    </tr>
    `,

  articleModal: ({ img, name, count, price, desc, stars, categories }) => `
    <div class="modal-mask shop-photo-modal" id="article-photo-modal" style="display: none;">
        <div class="container">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="flex-space-around-res">
                        <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>
                        <div class="cpm-bg">
                            <img src="${img}" alt="${desc}" class="img-fluid">
                        </div>

                        <div class="cpm-bg-fff p-20">
                            <div class="modal-body">

                                <!-- hdr -->
                                <div class="shop-photo-modal-header">
                                    <div class="hdr-wrapper">
                                        <h2>${name}</h2>                                        
                                    </div>

                                    <!-- Vote strip -->
                                    <p class="article-categories">Katogirije: <span>${categories.join(
                                      ' | '
                                    )}</span></p>
                                </div>

                                <div class="article-info-strip">
                                    <div class="vote-div">
                                        <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>
                                        <span>${price}</span>
                                    </div>
                                    <div>
                                        <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                                        <span>${stars}</span>
                                    </div>
                                </div>

                                <!-- body -->
                                <div class="shop-photo-modal-body">
                                    <div>
                                        <p class="init-line-height about-shop-article">${desc}</p>
                                    </div>
                                
                                    <div class="actions">
                                        <a href="#" class="btn-dark add-to-cart">
                                <i class="fa fa-cart-plus font-15" aria-hidden="true"></i> | <span class="content">Dodaj u korpu</span></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
}
