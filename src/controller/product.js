const Product = require('../database/product');

exports.add_product = (req, res) => {
    new Product({
        nameSeller: req.body.nameSeller,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        address: req.body.address,
        category: req.body.category,
        description: req.body.description,
        image: req.file.originalname,
        imageSeller: req.body.imageSeller,
        createAt: req.body.createAt,
        titleNotification: "đã thêm một mặt hàng để bán",
    }).save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send({
                status: true,
                message: "Thêm sản phẩm thành công",
            })
        }
    });
}

exports.delete_product_by_id = async(req, res) => {
    const products = await Product.findByIdAndDelete({_id: req.body._id});
    if(products){
        res.send({
            status: true,
            message: "Xoá sản phẩm thành công",
        });
    } else {
        res.send({
            status: false,
            message: "Xoá sản phẩm không thành công",
        });
    }
}

exports.update_product_by_id = async(req, res) => {
    await Product.findByIdAndUpdate({_id: req.body._id}, {
        nameSeller: req.body.nameSeller,
        nameProduct: req.body.nameProduct,
        price: req.body.price,
        address: req.body.address,
        category: req.body.category,
        description: req.body.description,
        image: req.file.originalname,
        imageSeller: req.body.imageSeller,
        createAt: req.body.createAt,
        titleNotification: "đã thêm một mặt hàng để bán",
    }, (err, doc) => {
        if(err) {
            res.send({
                status: false,
                message: "Chỉnh sửa sản phẩm không thành công"
            })
        } else {
            res.send({
                status: true,
                message: "Chỉnh sửa sản phẩm thành công",
            })
        }
    } );
}

exports.getAll_Product_By_Id = async(req, res) => {
    const Products = await Product.findOne({_id: req.body._id})
    .lean();
    res.send(
        Products)

}

exports.getAll_Product = async (req, res) => {
    try {
        let products = await Product.find()
            .lean();
            products.reverse();
        res.send({
            status: true,
            product: products,
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Error load data"
        });
        console.log(error);
    }
}