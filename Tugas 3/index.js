(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v3.fragment);
    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
    var programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    //For Triangles
    var thetaLoc = gl.getUniformLocation(program, 'theta'); 
    var transLoc = gl.getUniformLocation(program, 'vec');
    var sizeLoc = gl.getUniformLocation(program, 'size');
    var size = 0.2;
    var thetaT = [30, 60, 0];
    var vec = [0, 0, 0];
    var vecX = 0.0067;
    var vecY = 0.0076;
    var vecZ = 0.011;
    var nrp = 0.67;

    //For Lines
    var thetaLocL = gl.getUniformLocation(program2, 'theta'); 
    var transLocL = gl.getUniformLocation(program2, 'vec');
    var sizeLocL = gl.getUniformLocation(program2, 'size');
    var sizeL = 0.2;
    var thetaL = [30, 60, 0];
    var vec2 = [0, 0, 0];
    var vec2X = -0.006;
    var vec2Y = -0.009;
    var vec2Z = 0.021;

  
    //For Cube
    var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
    var thetaCube = [30, 60, 0];

    function cube(){
      gl.useProgram(programCube);

      // Definisi verteks dan buffer

      // Missing Lines : AD, DC, EF, DH
      var cubeVertices = [
        // x, y, z             r, g, b

        //ABCD
        -0.5, -0.5, 0.5,    1.0, 0.0, 1.0,    //A
        -0.5, 0.5, 0.5,     1.0, 0.0, 1.0,    //B
        -0.5, 0.5, 0.5,     1.0, 0.0, 1.0,    //B
        0.5, 0.5, 0.5,      1.0, 0.0, 1.0,    //C
        0.5, 0.5, 0.5,      1.0, 0.0, 1.0,    //C
        0.5, -0.5, 0.5,     1.0, 0.0, 1.0,    //D
        0.5, -0.5, 0.5,     1.0, 0.0, 1.0,    //D
        -0.5, -0.5, 0.5,    1.0, 0.0, 1.0,    //A
        
        //DCGH
        0.5, 0.5, 0.5,      1.0, 0.0, 1.0,    //C
        0.5, 0.5, -0.5,     1.0, 0.0, 1.0,    //G
        0.5, -0.5, 0.5,     1.0, 0.0, 1.0,    //D
        0.5, -0.5, -0.5,    1.0, 0.0, 1.0,    //H

        //ABFE
        -0.5, -0.5, 0.5,    1.0, 0.0, 1.0,    //A
        -0.5, -0.5, -0.5,   1.0, 0.0, 1.0,    //E
        -0.5, 0.5, 0.5,     1.0, 0.0, 1.0,    //B
        -0.5, 0.5, -0.5,    1.0, 0.0, 1.0,    //F

        //EFGH
        -0.5, -0.5, -0.5,   1.0, 0.0, 1.0,    //E
        -0.5, 0.5, -0.5,    1.0, 0.0, 1.0,    //F
        -0.5, 0.5, -0.5,    1.0, 0.0, 1.0,    //F
        0.5, 0.5, -0.5,     1.0, 0.0, 1.0,    //G
        0.5, 0.5, -0.5,     1.0, 0.0, 1.0,    //G
        0.5, -0.5, -0.5,    1.0, 0.0, 1.0,    //H
        0.5, -0.5, -0.5,    1.0, 0.0, 1.0,    //H
        -0.5, -0.5, -0.5,   1.0, 0.0, 1.0,    //E

      ];

      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programCube, 'vPosition');
      var vColor = gl.getAttribLocation(programCube, 'vColor');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.uniform3fv(thetaLocCube, thetaCube);
    }

    function triangle(){
      gl.useProgram(program);

      // Definisi vertex and buffer
      var triangleVertices = [
        //x,y         r,g,b
        +0.3, -0.5,  1.0, 1.0, 0.0,
        +0.3, +0.5,  0.7, 0.0, 1.0,
        +0.2, +0.5,  0.1, 1.0, 0.6,

        +0.3, -0.5,  1.0, 1.0, 0.0,
        +0.2, +0.5,  0.7, 0.0, 1.0,
        +0.2, -0.5,  0.1, 1.0, 0.6,

        +0.3, 0.0,   1.0, 1.0, 0.0,
        +0.4, +0.5,  0.7, 0.0, 1.0,
        +0.4, 0.0,   0.1, 1.0, 0.6,

        +0.5, +0.5,  1.0, 1.0, 0.0,
        +0.4, +0.5,  0.7, 0.0, 1.0,
        +0.4, 0.0,   0.1, 1.0, 0.6,

        +0.3, 0.0,   1.0, 1.0, 0.0,
        +0.4, -0.5,  0.7, 0.0, 1.0,
        +0.4, 0.0,   0.1, 1.0, 0.6,

        +0.5, -0.5,  1.0, 1.0, 0.0,
        +0.4, -0.5,  0.7, 0.0, 1.0,
        +0.4, 0.0,   0.1, 1.0, 0.6
      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );

      gl.uniform1f(sizeLoc, size);

      //Hit the Wall

      if(vec[0] > 0.5*(1-size) || vec[0] < -0.5*(1-size) ){
        vecX = vecX * -1;
      }
      vec[0] += vecX;

      if(vec[1] > 0.5*(1-size) || vec[1] < -0.5*(1-size) ){
        vecY = vecY * -1;
      }
      vec[1] += vecY;

      if(vec[2] > 0.5*(1-size) || vec[2] < -0.5*(1-size) ){
        vecZ = vecZ * -1;
      }
      vec[2] += vecZ;

      gl.uniform3fv(transLoc, vec);

      // gl.enableVertexAttribArray(vPosition);
      // gl.enableVertexAttribArray(vColor);

      //Y Rotation

      thetaT[1] += ( nrp * 3 );

      gl.uniform3fv(thetaLoc, thetaT);
    }

    function lines(){
      gl.useProgram(program2);

      var lineVertices = [
        //x,y         r,g,b
        -0.5, -0.5,  1.0, 1.0, 0.0,
         -0.5, +0.5,  1.0, 1.0, 0.0,
         -0.4, +0.5,  1.0, 1.0, 0.0,
         -0.4, +0.05, 1.0, 1.0, 0.0,
         -0.3, +0.5,  1.0, 1.0, 0.0,

         -0.2, +0.5,  1.0, 1.0, 0.0,
         -0.3, +0.0,  1.0, 1.0, 0.0,
         -0.2, -0.5,  1.0, 1.0, 0.0,
         -0.3, -0.5,  1.0, 1.0, 0.0,
         -0.4, -0.05, 1.0, 1.0, 0.0,

         -0.4, -0.5,  1.0, 1.0, 0.0,
         -0.5, -0.5,   1.0, 1.0, 0.0

      ];

      var lineVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );
    
      gl.uniform1f(sizeLocL, sizeL);

      //Hit the Wall

      if(vec2[0] > 0.5*(1-sizeL) || vec2[0] < -0.5*(1-sizeL) ){
        vec2X = vec2X * -1;
      }
      vec2[0] += vec2X;

      if(vec2[1] > 0.5*(1-sizeL) || vec2[1] < -0.5*(1-sizeL) ){
        vec2Y = vec2Y * -1;
      }
      vec2[1] += vec2Y;

      if(vec2[2] > 0.5*(1-sizeL) || vec2[2] < -0.5*(1-sizeL) ){
        vec2Z = vec2Z * -1;
      }
      vec2[2] += vec2Z;

      gl.uniform3fv(transLocL, vec2);

      // gl.enableVertexAttribArray(vPosition);
      // gl.enableVertexAttribArray(vColor);

      //Y Rotation

      thetaL[1] += ( nrp * 3 );

      gl.uniform3fv(thetaLocL, thetaL);
    }

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      triangle();
      gl.drawArrays(gl.TRIANGLES, 0, 18);

     // lines();
     // gl.drawArrays(gl.LINES, 0, 12);

      cube();
      gl.drawArrays(gl.LINES, 0, 24);

      requestAnimationFrame(render);
    }
    
    render();
  }
})();