var fs = require('fs');

fs.readFile('./test.txt', 'utf8', function(err, contents) {
    if ( err ) {
        console.log('No se pudo abrir el archivo.');
        return 0;
    }
    //console.log(contents.split('\r\n'));
    let lines = contents.split('\r\n');
    let departamentos = []
    lines.map( (r) => {
        let re = r.replace(/[“”"]/g,'');
        let segundo = re.split('/')[0].split(' ');
        segundo.shift();
        segundo = segundo.join('');
        segundo = segundo.trim();
        departamentos.push({
            "Código": re.split('/')[0].split(' ')[0],
            "Departamento": segundo,
            "Código Padre": '-',
            "Descripción Padre": '-'

        });
        return 0
    });
    console.log('departamentos',JSON.stringify(departamentos));
    let provincia = [];
    lines.map( (r) => {
        let re = r.replace(/[“”"]/g,'');
        if ( re.split('/')[1] > '' ) {
            if ( re.split('/')[1].trim() &&  !( re.split('/')[2].replace(/[\s]/g,'') )){
                let prov = re.split('/')[1].trim();
                let segundo = re.split('/')[0].split(' ');
                segundo.shift();
                segundo = segundo.join(' ');
                segundo = segundo.trim();
                provincia.push( {
                    "Código": prov.split(' ')[0],
                    "Nombre": prov.split(' ')[1],
                    "Código Padre": re.split('/')[0].split(' ')[0],
                    "Descripción Padre": segundo,
        
                });
            }
        }
        return 0;
    });
    console.log('provincia',JSON.stringify(provincia));
    let distrito = [];
    lines.map( (r) => {
        let re = r.replace(/[“”"]/g,'');
        if ( re.split('/')[2] ) {
            if ( re.split('/')[2].trim() ){
                let raw = re.split('/')[2].trim();
                let cod = raw.split(' ')[0];
                let dist = raw.split(' ');
                dist.shift();
                dist = dist.join(' ');
                let prov = re.split('/')[1].trim();
                distrito.push( {
                    "Código": cod,
                    "Nombre": dist,
                    "Código Padre": prov.split(' ')[0],
                    "Descripción Padre": prov.split(' ')[1],
        
                });
            }
        }
        return 0;
    });
    console.log('distrito',JSON.stringify(distrito));
});
