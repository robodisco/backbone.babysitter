describe("childview container", function(){

  describe("when adding a view that does not have a model or collection, to the container", function(){
    var container, view, foundView;

    beforeEach(function(){
      view = new Backbone.View();

      container = new Backbone.ChildViewContainer();

      container.add(view);

      foundView = container.findByCid(view.cid);
    });

    it("should make the view retrievable by the view's cid", function(){
      expect(foundView).toBe(view);
    });

    it("should update the size of the chidren", function(){
      expect(container.length).toBe(1);
    })
  });

  describe("when adding a view that has a model, to the container", function(){
    var container, view, foundView, model;

    beforeEach(function(){
      model = new Backbone.Model();
      view = new Backbone.View({
        model: model
      });

      container = new Backbone.ChildViewContainer();

      container.add(view);

      foundView = container.findByModel(model);
    });

    it("should make the view retrievable by the model", function(){
      expect(foundView).toBe(view);
    });
  });

  describe("when adding a view that has a collection, to the container", function(){
    var container, view, foundView, col;

    beforeEach(function(){
      col = new Backbone.Collection();
      view = new Backbone.View({
        collection: col
      });

      container = new Backbone.ChildViewContainer();

      container.add(view);

      foundView = container.findByCollection(col);
    });

    it("should make the view retrievable by the collection", function(){
      expect(foundView).toBe(view);
    });
  });

  describe("when adding a view that has a model and collection, to the container", function(){
    var container, view, mv, cv;

    beforeEach(function(){
      var col = new Backbone.Collection();
      var model = new Backbone.Model();

      view = new Backbone.View({
        model: model,
        collection: col
      });

      container = new Backbone.ChildViewContainer();

      container.add(view);

      mv = container.findByModel(model);
      cv = container.findByCollection(col);
    });

    it("should make the view retrievable by the model", function(){
      expect(mv).toBe(view);
    });

    it("should make the view retrievable by the collection", function(){
      expect(cv).toBe(view);
    });
  });

  describe("when adding a view with a custom index value", function(){
    var container, view, foundView;

    beforeEach(function(){
      view = new Backbone.View();

      container = new Backbone.ChildViewContainer();

      container.add(view, "custom indexer");

      foundView = container.findByCustom("custom indexer");
    });

    it("should make the view retrievable by the custom indexer", function(){
      expect(foundView).toBe(view);
    });
  });

  describe("when removing a view", function(){
    var container, view, model, col, cust;

    beforeEach(function(){
      model = new Backbone.Model();
      col = new Backbone.Collection();
      cust = "custome indexer";

      view = new Backbone.View({
        model: model,
        collection: col
      });

      container = new Backbone.ChildViewContainer();
      container.add(view, cust);

      container.remove(view);
    });

    it("should update the size of the chidren", function(){
      expect(container.length).toBe(0);
    })

    it("should remove the index by model", function(){
      var v = container.findByModel(model);
      expect(v).toBeUndefined();
    });

    it("should remove the index by collection", function(){
      var v = container.findByCollection(col);
      expect(v).toBeUndefined();
    });

    it("should remove the index by custom", function(){
      var v = container.findByCustom(cust);
      expect(v).toBeUndefined();
    });

    it("should remove the view from the container", function(){
      var v = container.findByCid(view.cid);
      expect(v).toBeUndefined();
    });
  });

  describe("when a container has 2 views in it", function(){

    describe("and applying a method with parameters", function(){
      var container, v1, v2;

      beforeEach(function(){
        v1 = new Backbone.View();
        v1.someFunc = jasmine.createSpy("some func");

        v2 = new Backbone.View();
        v2.someFunc = jasmine.createSpy("some func");

        container = new Backbone.ChildViewContainer();
        container.add(v1);
        container.add(v2);

        container.apply("someFunc", ["1", "2"]);
      });

      it("should call that method on the first view", function(){
        expect(v1.someFunc).toHaveBeenCalledWith("1", "2");
      });

      it("should call that method on the second view", function(){
        expect(v2.someFunc).toHaveBeenCalledWith("1", "2");
      });
    });

    describe("and calling a method with parameters", function(){
      var container, v1, v2;

      beforeEach(function(){
        v1 = new Backbone.View();
        v1.someFunc = jasmine.createSpy("some func");

        v2 = new Backbone.View();
        v2.someFunc = jasmine.createSpy("some func");

        container = new Backbone.ChildViewContainer();
        container.add(v1);
        container.add(v2);

        container.call("someFunc", "1", "2");
      });

      it("should call that method on the first view", function(){
        expect(v1.someFunc).toHaveBeenCalledWith("1", "2");
      });

      it("should call that method on the second view", function(){
        expect(v2.someFunc).toHaveBeenCalledWith("1", "2");
      });
    });

    describe("and calling a method that doesn't exist on one of the views", function(){
      var container, v1, v2;

      beforeEach(function(){
        v1 = new Backbone.View();

        v2 = new Backbone.View();
        v2.someFunc = jasmine.createSpy("some func");

        container = new Backbone.ChildViewContainer();
        container.add(v1);
        container.add(v2);

        container.call("someFunc", "1", "2");
      });

      it("should call that method on the second view", function(){
        expect(v2.someFunc).toHaveBeenCalledWith("1", "2");
      });
    });

  });

});
