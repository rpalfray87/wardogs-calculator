import type { Dict } from '../dict';

export const pt: Dict = {
  'titlebar.settings': 'Configurações e calibração',
  'titlebar.hide': 'Ocultar a sobreposição (Esc)',
  'titlebar.back': 'Voltar à calculadora',
  'settings.title': 'Configurações · calibração',

  'key.enter': 'Enter',
  'key.esc': 'Esc',

  'point.origin': 'Minha posição',
  'point.target': 'Alvo',
  'point.clear': 'Limpar',
  'point.clearOrigin': 'Limpar minha posição',
  'point.clearTarget': 'Limpar o alvo',

  'result.azimuth': 'Azimute',
  'result.distance': 'Distância',
  'result.copyTitle': 'Clique para copiar',
  'result.copied': '{label} copiado',
  'result.copyFailed': 'não foi possível copiar',
  'result.saved': 'Alvo memorizado',
  'hint.ready': 'Enter memoriza · clique num número para copiá-lo',
  'hint.incomplete': 'Preencha as quatro coordenadas.',

  'history.title': 'Histórico',
  'history.clearAction': 'Limpar',
  'history.clearTitle': 'Limpar o histórico',
  'history.empty': '{key} memoriza o alvo atual.',
  'history.load': 'Recarregar este alvo',
  'history.delete': 'Excluir este alvo',
  'history.deleteAria': 'Excluir o alvo {label}',

  'footer.overlay': '{hotkey} mostra / oculta · {esc} devolve o controle ao jogo',
  'footer.web': 'Azimute 0° = Norte, sentido horário.',

  'set.language.label': 'Idioma',
  'set.language.help': 'Idioma da interface. O inglês é o padrão.',
  'set.scale.label': 'Metros por ponto de coordenada',
  'set.scale.help':
    'Hipótese inicial: 10 pontos = 1000 m, ou seja 100 m por ponto. Se a distância indicada estiver proporcionalmente errada no jogo, é aqui que se corrige.',
  'set.yaxis.label': 'Sentido do eixo Y',
  'set.yaxis.up': 'Y aumenta para o Norte',
  'set.yaxis.down': 'Y aumenta para o Sul',
  'set.yaxis.help':
    'Se o azimute exibido estiver defasado em 180° no jogo, é esta a configuração a inverter.',
  'set.unit.label': 'Unidade do azimute',
  'set.unit.deg': 'Graus (0-360)',
  'set.unit.mil': 'Milésimos',
  'set.unit.help':
    'Deixe em graus enquanto a bússola do jogo não for verificada. Os milésimos da mira servem para a elevação do tubo, não para a direção.',
  'set.mil.label': 'Padrão de milésimos',
  'set.mil.nato': '6400 — OTAN',
  'set.mil.warsaw': '6000 — ex-Pacto de Varsóvia',
  'set.hotkey.label': 'Atalho global',
  'set.hotkey.help':
    'Sintaxe do Electron: Alt+M, Ctrl+Shift+A, F8. Mostra e oculta a sobreposição.',
  'set.hotkey.error': 'Atalho “{key}” recusado ou já ocupado.',
  'set.hotkey.errorGeneric': 'Atalho não aplicável.',
  'set.opacity.label': 'Opacidade da sobreposição — {percent} %',
  'set.reset': 'Redefinir as configurações',
};
