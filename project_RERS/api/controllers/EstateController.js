/**
 * EstateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //action -create
    create: async function (req, res) {
        if (req.method == "GET")
            return res.view('estate/create');

        if (!req.body.Estate)
            return res.badRequest("Form-data not received.");
        var reqEstate = req.body.Estate;
        reqEstate['Created'] = new Date().toLocaleDateString();
        await Estate.create(req.body.Estate);

        //return res.ok("Successfully created!");
        return res.redirect("/");
    },

    // json function
    json: async function (req, res) {

        var estates = await Estate.find();

        return res.json(estates);
    },

    // action - index
    index: async function (req, res) {

        var models = await Estate.find(
            {
                where: { HighlightedProperty: true },
                sort: [{ Updated: 'DESC' }],
                limit: 4
            }
        );
        return res.view('estate/index', { estates: models });

    },

    // action - admin
    admin: async function (req, res) {

        var models = await Estate.find();
        return res.view('estate/admin', { estates: models });

    },

    // action - view
    view: async function (req, res) {

        var model1 = await Estate.findOne(req.params.id).populate('rentBy');

        var num_renter=model1.rentBy.length;
        if (!model1) return res.notFound();

        var compare=0;
        var model = await Estate.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('estate/view', { estate: model,num_renter, compare,renter: model1 });

    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var model = await Estate.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('estate/update', { estate: model });

        } else {

            if (!req.body.Estate)
                return res.badRequest("Form-data not received.");
            if (!req.body.Estate.HighlightedProperty) {
                req.body.Estate.HighlightedProperty = 'false';
            } else {
                req.body.Estate.HighlightedProperty = 'true';
            }
            var d = new Date().toLocaleDateString();
            var models = await Estate.update(req.params.id).set({
                PropertyTitle: req.body.Estate.PropertyTitle,
                estate: req.body.Estate.estate,
                GrossArea: req.body.Estate.GrossArea,
                rent: req.body.Estate.rent,
                bedrooms: req.body.Estate.bedrooms,
                ExpectedTenants: req.body.Estate.ExpectedTenants,
                ImageURL: req.body.Estate.ImageURL,
                HighlightedProperty: req.body.Estate.HighlightedProperty,
                Updated: d

            }).fetch();

            if (models.length == 0) return res.notFound();

            //return res.ok("Record updated");
            return res.redirect("/");

        }
    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Estate.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        //return res.ok('Estate Deleted.');
        return res.redirect("/estate/admin");

    },

    // search function
    search: async function (req, res) {

        const qEstate = req.query.estate || '';
        const qBedrooms = parseInt(req.query.bedrooms) || 100;
        const qAreaMin = parseInt(req.query.AreaMin) || 0;
        const qAreaMax = parseInt(req.query.AreaMax) || 100000;
        const qRentMin = parseInt(req.query.RentMin) || 0;
        const qRentMax = parseInt(req.query.RentMax) || 100000;

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        if (!req.query.bedrooms) {
            var str = 'estate=' + qEstate + '&AreaMin=' + qAreaMin + '&AreaMax=' + qAreaMax + '&RentMin=' + qRentMin + '&RentMax=' + qAreaMax;
            var models = await Estate.find({
                where: {
                    estate: { contains: qEstate },
                    bedrooms: { '<=': qBedrooms },
                    GrossArea: { '>=': qAreaMin, '<=': qAreaMax },
                    rent: { '>=': qRentMin, '<=': qRentMax }
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage
            });
            var models2 = await Estate.find({
                where: {
                    estate: { contains: qEstate },
                    bedrooms: { '<=': qBedrooms },
                    GrossArea: { '>=': qAreaMin, '<=': qAreaMax },
                    rent: { '>=': qRentMin, '<=': qRentMax }
                },

            });

        } else {
            var str = 'estate=' + qEstate + '&bedrooms=' + qBedrooms + '&AreaMin=' + qAreaMin + '&AreaMax=' + qAreaMax + '&RentMin=' + qRentMin + '&RentMax=' + qAreaMax;
            var models = await Estate.find({
                where: {
                    estate: { contains: qEstate },
                    bedrooms: qBedrooms,
                    GrossArea: { '>=': qAreaMin, '<=': qAreaMax },
                    rent: { '>=': qRentMin, '<=': qRentMax }
                },
                limit: numOfItemsPerPage,
                skip: numOfItemsPerPage * qPage

            });
            var models2 = await Estate.find({
                where: {
                    estate: { contains: qEstate },
                    bedrooms: qBedrooms,
                    GrossArea: { '>=': qAreaMin, '<=': qAreaMax },
                    rent: { '>=': qRentMin, '<=': qRentMax }
                },

            });
        }



        var numOfPage = Math.ceil(models2.length / numOfItemsPerPage);

        return res.view('estate/search', { estates: models, count: numOfPage, a: str });
    },


    populate: async function (req, res) {

        var model = await Estate.findOne(req.params.id).populate("rentBy");

        if (!model) return res.notFound();

        //return res.json(model);
        return res.view('estate/occupants', { estate: model });

    },




};

