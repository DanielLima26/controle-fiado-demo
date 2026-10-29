# Controle de Fiado — Demonstração

Cópia independente para demonstração. Não utiliza a base, usuários, senhas, logomarca, volume ou projeto de outro estabelecimento. Somente dados fictícios. Não inserir informações pessoais reais.

## Executar

Requer Node.js 24 ou superior: `npm start`. Abra http://localhost:3000.

Usuário Administrador ou Atendente; senha de ambos: Demo1234. Também há botões para experimentar cada perfil. As contas não podem ser alteradas nesta demonstração.

Banco SQLite em memória, apagado ao reiniciar. O administrador pode usar Reiniciar exemplos. Não é um sistema de produção, nem uma cópia de segurança. A demonstração hospedada é compartilhada entre visitantes; as ações de um visitante aparecem para os demais. Telefones de exemplo são deliberadamente inválidos; WhatsApp externo desativado.

Exemplo: Cliente Exemplo A possui uma venda de R$100, haver de R$50 e saldo de R$50. Há cliente arquivado e produtos fictícios. Mantém vendas, haveres, cadastros, catálogo, permissões, extratos, auditoria, fotos e simulação de acréscimos do código de origem.

## Hospedagem independente

Criar um projeto NOVO, sem anexar o volume nem variáveis de qualquer sistema real. Para Railway Function, executar node build-function.mjs e usar Bun para gerar arquivo único com interest.mjs incluído: `bun build railway-function.ts --target=bun --minify --outfile=railway-function.min.ts`.
Configurar APP_ORIGIN com o endereço HTTPS desse novo serviço e NODE_ENV=production. Não reutilizar domínio, serviço, senhas, BOOTSTRAP_USERS_JSON, BACKUP_TOKEN nem DATA_DIR de outro sistema.

Validação local: acessos dos dois perfis, permissões, cadastro com contato obrigatório, venda, haver, saldo restante, reinício e identidade genérica passaram nos testes de integração. Código para Railway compilado com Bun. Testes visuais e uso real ainda não realizados.

A publicação não foi concluída em 29/10/2026: Railway retornou limite de provisionamento do plano gratuito. Nenhuma alteração foi feita no serviço original.
