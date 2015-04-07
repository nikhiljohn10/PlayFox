(function() {
    (function() {
        // alert($(window).width() + 17);
        if ($(window).width() > 750) {
            $('body').append('<div class="foxy"></div> <div class="ground top"></div> <div class="ground left"></div> <div class="ground right"></div> <div class="ground bottom"></div>');
        }
    }());

    // Flatten Box2d (ugly but handy!)
    (function b2(o) {
        for (k in o) {
            if (o.hasOwnProperty(k)) {
                if ($.isPlainObject(o[k])) {
                    b2(o[k]);
                } else if (/^b2/.test(k)) {
                    window[k] = o[k];
                }
            }
        }
    }(Box2D));

    var world = new b2World(
        new b2Vec2(0, 9.81), // gravity
        true // allow sleep
    );
    var SCALE = 30;

    //
    // Ground Bottom
    //

    (function($ground) {
        // Fixture
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        // Shape
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            $ground.outerWidth() / 2 / SCALE, //half width
            $ground.outerHeight() / 2 / SCALE //half height
        );

        // Body
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = ($ground.offset().left + $ground.outerWidth() / 2) / SCALE;
        bodyDef.position.y = ($ground.offset().top + $ground.outerHeight() / 2) / SCALE;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        $ground.data('body', body);
    }($('.events')));

    //
    // Ground Top
    //

    (function($ground) {
        // Fixture
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        // Shape
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            $ground.outerWidth() / 2 / SCALE, //half width
            $ground.outerHeight() / 2 / SCALE //half height
        );

        // Body
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = ($ground.offset().left + $ground.outerWidth() / 2) / SCALE;
        bodyDef.position.y = ($ground.offset().top + $ground.outerHeight() / 2) / SCALE;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        $ground.data('body', body);
    }($('.ground.top')));

    //
    // Ground Right
    //

    (function($ground) {
        // Fixture
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        // Shape
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            $ground.outerWidth() / 2 / SCALE, //half width
            $ground.outerHeight() / 2 / SCALE //half height
        );

        // Body
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = ($ground.offset().left + $ground.outerWidth() / 2) / SCALE;
        bodyDef.position.y = ($ground.offset().top + $ground.outerHeight() / 2) / SCALE;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        $ground.data('body', body);
    }($('.ground.right')));

    //
    // Ground Left
    //

    (function($ground) {
        // Fixture
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        // Shape
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            $ground.outerWidth() / 2 / SCALE, //half width
            $ground.outerHeight() / 2 / SCALE //half height
        );

        // Body
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.x = ($ground.offset().left + $ground.outerWidth() / 2) / SCALE;
        bodyDef.position.y = ($ground.offset().top + $ground.outerHeight() / 2) / SCALE;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        $ground.data('body', body);
    }($('.ground.left')));



    //
    // Foxy
    //

    (function($foxy) {
        // Fixture
        var fixDef = new b2FixtureDef;
        fixDef.density = 1;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        // Shape
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(
            $foxy.outerWidth() / 2 / SCALE, //half width
            $foxy.outerHeight() / 2 / SCALE //half height
        );

        // Body
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.fixedRotation = true;
        bodyDef.position.x = ($foxy.offset().left + $foxy.outerWidth() / 2) / SCALE;
        bodyDef.position.y = ($foxy.offset().top + $foxy.outerHeight() / 2) / SCALE;

        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        $foxy.data('body', body);
    }($('.foxy')));


    //
    // MouseJoint
    //

    var mouse = new b2Vec2();
    $(window).mousemove(function(e) {
        mouse.Set(e.pageX / SCALE, e.pageY / SCALE);
    });
    window.mouse = mouse;

    (function(mouse) {
        var mouseJointDef = new b2MouseJointDef();
        mouseJointDef.target = mouse;
        mouseJointDef.bodyA = world.GetGroundBody();
        mouseJointDef.collideConnected = true;

        var mouseJoint;
        $('*').on({
            mousedown: function(e) {
                var body = $(this).data('body');

                if (!body) {
                    return;
                }

                mouseJointDef.bodyB = body;
                mouseJointDef.maxForce = 3000 * body.GetMass();

                mouseJoint = world.CreateJoint(mouseJointDef);
                mouseJoint.SetTarget(mouse);

                function mouseup(e) {
                    world.DestroyJoint(mouseJoint);
                }

                $(window).one('mouseup', mouseup);
            }
        });
    }(mouse));

    //
    // Loops
    //

    (function() {
        var dt = 30;
        new Loop(function() {
            world.Step(
                1 / dt, //frame-rate
                10, //velocity iterations
                10 //position iterations
            );

            world.ClearForces();

        }, 1000 / dt).start();
    }());

    (function() {
        var $entities = $('.foxy');

        // cache some initial coordinates informations
        $entities.each(function(i, el) {
            var $el = $(el);
            $el.data('origPos', {
                left: $el.offset().left,
                top: $el.offset().top,
                width: $el.outerWidth(),
                height: $el.outerHeight()
            });
        });

        new Loop(function(t, t0) {
            if (!t0) {
                return;
            }
            var dt = t - t0;
            if (dt <= 0) {
                return;
            }

            var i = $entities.length
            while (i--) {
                (function() {
                    var entity = $entities[i];
                    var $entity = $(entity);

                    var body = $entity.data('body');
                    var pos = body.GetPosition();
                    var ang = body.GetAngle() * 180 / Math.PI;
                    var origPos = $entity.data('origPos')

                    $entity.css('transform', 'translate3d(' + ~~(pos.x * SCALE - origPos.left - origPos.width / 2) + 'px, ' + ~~(pos.y * SCALE - origPos.top - origPos.height / 2) + 'px, 0) rotate3d(0,0,1,' + ~~ang + 'deg)');
                }());
            }


            function angleVV(v1, v2) {
                var n1 = v1.Length();
                var n2 = v2.Length();

                return Math.atan2(v1.y / n1, v1.x / n1) - Math.atan2(v2.y / n2, v2.x / n2);
            }

        }).start();
    }());

}(jQuery, Box2D));
