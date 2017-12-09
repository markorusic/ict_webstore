export default {
	article: function(article) {
		return `
			<div class="col-6 col-sm-4 col-md-3">
                <article class="store-articles-list-item"
                         style="background-image: url('${article.img}');">
                    <div class="cpli-overlay"><!-- class overlay --></div>
                    <div class="cpli-content">
                        <div class="article-info-strip">
                            <div>
                                <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>
                                <span>${article.price}</span>
                            </div>
                            <div>
                                <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                                <span>${article.stars}</span>
                            </div>
                        </div>
                        <div class="text-center store-article-info">
                            <p style="font-size: 16px;">${article.name}</p>
                            <a href="#" class="btn-white add-to-cart" data-toggle="tooltip" data-placement="top" title="Dodato u korupu!" data-animation="false">
                            	<i class="fa fa-cart-plus" aria-hidden="true" style="font-size: 15px;"></i> | <span class="content">Dodaj u korpu</span></a>
                        </div>
                    </div>
                </article>
            </div>
		`
	},

	articleTr: function(article, num) {
		return `
			<tr>
                <td class="mt">#${num}</td>
                <td class="mt rl-avatar-td">
                    <a href="#">
                        <div class="article-avatar"
                             style="background-image: url('${article.img}');"></div>
                    </a>
                </td>
                <td class="mt">
                    <span>
                        ${article.name}
                    </span>
                </td>
                <td class="mt">${article.count}</td>
                <td>${article.price * article.count}</td>
                <td>
                	<a href="#" class="remove-form-cart btn btn-danger-btn-sm"><i class="fa fa-times"></i></a>
                </td>
            </tr>
		`
	},

	articleTrPopover: function(article) {
		return `
			<tr>
                <td>
                    <a href="#">
                        <div class="article-avatar" style="background-image: url('${article.img}');"></div>
                    </a>
                </td>
                <td>${article.name}</td>
                <td>${article.count}</td>
                <td>${article.price * article.count}</td>
            </tr>
		`	
	},


    articleModal: function(article) {
        return `
    <div class="modal-mask shop-photo-modal" id="article-photo-modal" style="display: none;">
        <div class="container">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="row">
                        <a class="top-right" href="#"><i class="fa fa-times" aria-hidden="true"></i></a>
                        <div class="col-12 col-md-8 cpm-bg">
                            <img src="${article.img}" alt="${article.desc}" class="img-fluid">
                        </div>

                        <div class="col-12 col-md-4 cpm-bg-fff">
                            <div class="modal-body">

                                <!-- hdr -->
                                <div class="shop-photo-modal-header">
                                    <div class="hdr-wrapper">
                                        <h2>${article.name}</h2>                                        
                                    </div>

                                    <!-- Vote strip -->
                                    <p class="article-categories">Katogirije: <span>${article.categories.join(' | ')}</span></p>
                                </div>

                                <div class="article-info-strip">
                                    <div class="vote-div">
                                        <a href="#"><i class="fa fa-eur" aria-hidden="true"></i></a>
                                        <span>${article.price}</span>
                                    </div>
                                    <div>
                                        <a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>
                                        <span>${article.stars}</span>
                                    </div>
                                </div>

                                <!-- body -->
                                <div class="shop-photo-modal-body">
                                    <div>
                                        <p class="about-shop-article">${article.desc}</p>
                                    </div>
                                 
                                    <div class="actions">
                                        <a href="#" class="btn-dark add-to-cart" data-toggle="tooltip" data-placement="top" title="Dodato u korupu!" data-animation="false">
                                <i class="fa fa-cart-plus" aria-hidden="true" style="font-size: 15px;"></i> | <span class="content">Dodaj u korpu</span></a>
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
}