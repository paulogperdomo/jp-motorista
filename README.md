# JP Motorista

App do motorista da **JP Transportes** (PWA instalável), publicado pelo GitHub Pages.

- **Início**: rota do dia (andamento), previsão de amanhã, PNR em aberto, avisos.
- **Abastecer**: registro do vale do convênio com km do painel, litros, valor e fotos do vale e do painel.
- **Rotas**: rotas da quinzena atual, anterior ou do mês.
- **PNR**: casos em aberto e prazos.

A representante (Jessica) vê todos os motoristas e os valores; os demais veem só os próprios dados, sem valores.

**Administrador** (Paulo): entra escolhendo "Administrador" com PIN de 6 dígitos (aba Config, "PIN administrador (app)"). Vê tudo e tem a aba **Gestão**: publicar/apagar avisos, abastecimentos de todos com alertas e fotos, último acesso de cada motorista e gerar PIN novo (desconecta o motorista na hora).

## Como funciona
- Este repositório tem só a interface (`index.html`), ícones, `manifest.webmanifest` e `sw.js`. Não tem PIN, senha nem dado de motorista.
- Os dados vêm da planilha *Base de Dados - Sistema JP Transporte* por uma API no Google Apps Script
  (projeto "Abastecimento JP - Registro", App da Web, acesso "Qualquer pessoa"). O endereço está na constante `API` no `index.html`.
- Login: nome + PIN de 4 dígitos (aba Motoristas da planilha, coluna "PIN abastecimento"). 5 erros seguidos bloqueiam por 15 min.
- Avisos: aba `Avisos` da planilha (Data, Para, Aviso, Válido até). "Para" = Todos ou o nome do motorista.

## Atualizar
- Mudou algum arquivo daqui → subir `VERSAO` no `sw.js`.
- Mudou a implantação da API → trocar `API` no `index.html`.
