(function (window, document) {
    window.onload = function () {
        'use strict';
        function generateHTML() {
            var body, containerFields, containerTip, containerControls, containerResult, draw, restart, box, h2, p;
            body = document.body;
            h2 = createEl('h2', 'Lottoschein');

            body.appendChild(h2);
            //body.insertBefore(h2, document.getElementsByName('noscript')[0]);
            
            containerFields = createEl('div');
            containerFields.id = 'fields';
            body.appendChild(containerFields);
            
            for (var i = 0; i < 49; i++) {
                box = createEl('div', (i + 1));
                box.classList.add('field');
                box.onclick = markField;
                containerFields.appendChild(box);
            }

            // var fields = document.getElementsByClassName('field');
            // for (var i = 0; i < fields.length; i++) {
            //     fields[i].onclick = markField;
            // }

            containerTip = createEl('div');
            containerTip.id = 'tip';
            body.appendChild(containerTip);
            h2 = createEl('h2', 'Ihr Tipp');
            containerTip.appendChild(h2);
            p = createEl('p');
            containerTip.appendChild(p);

            containerControls = createEl('div');
            containerControls.id = 'controls';
            body.appendChild(containerControls);
            draw = createEl('input');
            draw.id = 'draw';
            draw.type = 'button';
            draw.value = 'Starte Ziehung';
            containerControls.appendChild(draw);
            draw.onclick = startDraw;

            restart = createEl('input');
            restart.id = 'restart';
            restart.type = 'button';
            restart.value = 'Neu Starten';
            containerControls.appendChild(restart);
            restart.onclick = restartGame;

            containerResult = createEl('div');
            containerResult.id = 'result';
            h2 = createEl('h2', 'Auswertung');
            containerResult.appendChild(h2);
            body.appendChild(containerResult);
        }
        
        
        function markField() {
            /* HTMLCollection Klasse cross Live Update */
            var cross = document.getElementsByClassName('cross');
            /* Noch nicht 6 Felder angewählt und das aktuelle Feld  nicht angewählt ist...
            contains prüft ob die angegeben Klasse vorhanden ist. */
            if (cross.length < 6 && !this.classList.contains('cross')) {
                /* ... am geklickten Feld die Klasse hinzufügen */
                this.classList.add('cross');
            }/* Die Klasse cross ist bereits vorhanden... */ 
            else if (this.classList.contains('cross')) {
                /* ...dann entfernen wir sie */
                this.classList.remove('cross')
            } else {
                alert('Nur 6 Zahlen erlaubt');
            }
            showTip(cross); // showTip();
        }

        function showTip(selection) {
            var out = [];
            for (let index = 0; index < selection.length; index++) {
                out.push(selection[index].textContent);                
            }
           document.getElementById('tip').getElementsByTagName('p')[0].textContent = out.join(', ');
        }

        function startDraw() {
            var cross = document.getElementsByClassName('cross');
            var result = document.getElementById('result').children;
            for (var i = 1; i < result.length; i++) {
                result[i].textContent = '';
            }
            if (cross.length === 6) {
                var draws = [],
                    randNr;
                while (draws.length < 6) {
                    randNr = rand(1, 49);
                    if (draws.indexOf(randNr) === -1) {
                        draws.push(randNr);
                    }
                }
                checkResult(draws);
            } else {
                alert('Bitte tippen Sie 6 Zahlen');
            }
        }

        function checkResult(drawing) {
            var hits = [],
                predictions = [],
                p;
            var cross = document.getElementsByClassName('cross');
            for (var i = 0; i < cross.length; i++) {
                predictions.push(Number(cross[i].textContent));
            }
            for (var i = 0; i < drawing.length; i++) {
                if (predictions.indexOf(drawing[i]) > -1) {
                    hits.push(drawing[i]);
                }
            }
            var result = document.getElementById('result'); //div#resulst
            var child = result.firstElementChild; // h2 im div
            /* p-Elemente über Elternelement div#result einlesen */
            var p = result.getElementsByTagName('p');
            /* Anzahl Element in len speichern -> 3 */
            var len = p.length;
            /* len-- 3-1
            Positive Zahlen im while sind true.
            Nach dem der Index 0 entfernt wurde steht im Schleifenkopf
            while(0--) die 0 ist im while false, Schleife beendet.  */
            while(len--) {
                /* Im ersten Schleifendurchlauf p[2].remove()
                remove entfernt das Element */
                // result.removeChild(p[len]);
                p[len].remove();
            }
            // result.textContent = '';
            p = createEl('p', 'Ziehung: ' + drawing.join(', '));
            result.appendChild(p);
            p = createEl('p', 'Anzahl richtige: ' + hits.length);
            result.appendChild(p);
            p = createEl('p', 'Richtige Zahlen: ' + hits.join(', '));
            result.appendChild(p);
        }

        function restartGame() {
            var fields = document.getElementsByClassName('field');
            for (var i = 0; i < fields.length; i++) {
                fields[i].classList.remove('cross');
            }
            document.getElementById('tip').getElementsByTagName('p')[0].textContent = '';
            document.getElementById('result').textContent = '';
        }
        generateHTML();
    };
}(window, document));
